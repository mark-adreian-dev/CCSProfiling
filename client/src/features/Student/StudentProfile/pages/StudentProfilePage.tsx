import type { User } from "@/core/domain/entity/user.entity";
import { useGetUserQuery } from "@/core/hooks/auth.hooks";
import SpinnerLoader from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import Profile from "@/core/presentation/components/shared/Profile";

export default function StudentProfilePage() {
  const { data: user, isPending } = useGetUserQuery();
  if (isPending) return <SpinnerLoader message="Fetching data..." />;
  if (!user) return <>No user found...</>;
  return <Profile user={user as User} />;
}
