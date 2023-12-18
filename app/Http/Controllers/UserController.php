<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //CREATE A NEW USER
    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
        ]);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    //UPDATE USER (NAME, EMAIL)
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($data);

        return response()->json($user, 200);
    }

    //LIST ALL THE USERS 
    public function listUsers()
    {
        $users = User::all();

        return response()->json($users, 200);
    }

    //SOFT DELETE USER
    public function softDeleteUser($id)
    {
        $user = User::findOrFail($id);

        // Soft delete the user
        $user->delete();

        return response()->json(['message' => 'User soft-deleted successfully'], 200);
    }

        //LIST SOFT DELETED USERS 
        public function listSoftDeletedUsers()
    {
        // Include only soft-deleted users
        $users = User::onlyTrashed()->get();
    
        return response()->json($users, 200);
     }

    //RESTORE SOFT DELETED USERS
    public function restoreUser($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        // Restore the soft-deleted user
        $user->restore();

        return response()->json(['message' => 'User restored successfully'], 200);
    }

}
