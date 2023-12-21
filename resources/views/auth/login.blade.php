<h1>Login</h1>

<form  action="{{ route('login') }}"  method="post">
    @csrf

    <!-- Email-->
    <label for="email">Email</label>
    <input type="email" name="email" id="email"  />

    <!-- Password -->
    <label for="password">Password</label>
    <input type="password" name="password" id="password"  />

    <!-- Submit button -->
    <button type="submit">Login</button>
</form>