// As a user, I want to enter information after registering to personalize my experience
// As a user, I want to input dietary restrictions as a part of my profile
// As a user, I want to input a name that the application will use

// Definition of Done

//     /onboarding implements the above
//     User is redirected to the /onboarding page after registering

// Additional context

//     Use the AuthForm functional component as a skeleton
//     Create a mutation procedure to update user information
import BaseAuthPage from "~/components/auth/BaseAuthPage";
import Onboarding from "~/components/auth/Onboarding";

export default function onboarding() {
  return (
    <BaseAuthPage>
      <Onboarding />
    </BaseAuthPage>
  );
}
