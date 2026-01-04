import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/clerk-react";

const Login = () => {
  return (
      <div>
        <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      
    </div>
  );
};

export default Login;
