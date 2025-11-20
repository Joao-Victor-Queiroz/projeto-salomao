import CrismandosList from "@/components/CrismandoComponents/CrismandosList";
import { useCrismandos } from "@/hooks/useCrismandos";
import ErrorState from "@/components/ui/Error";

export default function Crismandos() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error, refetch } =
    useCrismandos();

  const crismandos =
    data?.pages.flatMap((page) => page.data).filter(Boolean) ?? [];

    if (isError) return <ErrorState error={error} onRetry={refetch}/>

  return (
    <CrismandosList
      data={crismandos}
      isLoading={isLoading}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
