import type { User } from "@/core/domain/entity/user.entity";
import { useGetStudentByIdQuery } from "@/core/hooks/user.hooks";
import SpinnerLoader from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import Profile from "@/core/presentation/components/shared/Profile";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const { data: userData, isPending } = useGetStudentByIdQuery(Number(id));

  const user = useMemo(() => {
    return userData?.data;
  }, [userData]);

  if (isPending) return <SpinnerLoader message="Fetching data..." />;
  if (!user) return <>No user found...</>;
  return <Profile user={user as User} />;
}
