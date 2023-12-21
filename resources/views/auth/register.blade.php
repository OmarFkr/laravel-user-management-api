<div class="container mx-auto mt-8">
    <div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 class="text-2xl font-semibold mb-6">Register</h1>

        <form action="{{ route('register') }}" method="post">
            @csrf
            <!-- Name -->
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
                <input type="text" name="name" id="name" class="mt-1 p-2 w-full border rounded-md">
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" name="email" id="email" class="mt-1 p-2 w-full border rounded-md">
            </div>

            <!-- Password -->
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                <input type="password" name="password" id="password" class="mt-1 p-2 w-full border rounded-md">
            </div>

            <!-- Confirm password -->
            <div class="mb-6">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-600">Confirm password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="mt-1 p-2 w-full border rounded-md">
            </div>

            <!-- Submit button -->
            <button type="submit" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Register
            </button>
        </form>
    </div>
</div>
