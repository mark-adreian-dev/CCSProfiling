import React, { useState, type ChangeEvent } from "react";
import { OrderBy } from "@/core/enums/order.enum";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { Interest } from "@/core/domain/entity/interest.entity";
import { useAddUserInterestMutation, useGetAllInterestQuery, useRemoveUserInterestMutation } from "@/core/hooks/interest.hooks";
import { cn } from "@/core/presentation/lib/utils";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "../../base/ui/sheet";
import { ScrollArea } from "../../base/ui/scroll-area";
import { Input } from "../../base/ui/input";
import { PlusCircle, Search, X, type LucideIcon } from "lucide-react";
import { Button } from "../../base/ui/button";
import SpinnerLoader from "../../custom/Loader/LoadingSpinner";
import { Badge } from "../../base/ui/badge";

interface ManageInterestFormProps {
  FormTrigger: React.ElementType<{ className?: string; icon?: React.ElementType }>;
  Icon?: LucideIcon;
  className?: string;
  currentInterest: Interest[];
}

export default function ManageInterestForm({ Icon, FormTrigger, className, currentInterest }: ManageInterestFormProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [params, setParams] = useState<PaginationParams<Interest>>({
    page: 1,
    pageSize: 30,
    search: "",

    order: OrderBy.DESCENDING,
    sortBy: "created_at",
  });
  const { mutateAsync: addUserInterest } = useAddUserInterestMutation();
  const { mutateAsync: removeUserInterest } = useRemoveUserInterestMutation();
  const { data: interestResponse, isPending: isLoadingInterest } = useGetAllInterestQuery({ params: params });
  const currentInterestIds = new Set(currentInterest.map((i) => i.id));
  const pagination = interestResponse?.data.pagination;
  const navigation = interestResponse?.data.navigation;

  const currentPage = pagination?.current_page ?? 1;
  const totalPages = pagination?.total_pages ?? 1;

  const interestRepository =
    interestResponse?.data.content
      ?.filter((item) => !currentInterestIds.has(item.id))
      .map((item) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at ?? null,
        updated_at: item.updated_at ?? null,
        deleted_at: item.deleted_at ?? null,
      })) ?? [];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams((prev) => {
      return {
        ...prev,
        search: value,
        page: 1,
      };
    });
  };

  const handleNextPage = () => {
    if (!navigation?.next_page_num) return;

    setParams((prev) => ({
      ...prev,
      page: navigation.next_page_num!,
    }));
  };

  const handlePrevPage = () => {
    if (!navigation?.prev_page_num) return;

    setParams((prev) => ({
      ...prev,
      page: navigation.prev_page_num!,
    }));
  };

  const handleRemove = async (interestId: number) => {
    await removeUserInterest(interestId);
  };

  const handleAdd = async (interestId: number) => {
    await addUserInterest(interestId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <FormTrigger icon={Icon} />
      </SheetTrigger>
      <SheetContent className={cn("flex flex-col p-6 max-w-[100vw]!", className)}>
        <SheetHeader className="p-0 mb-10">
          <SheetTitle className="text-3xl font-bold">Manage Skills/Interest</SheetTitle>
          <SheetDescription>Update your skills and interest</SheetDescription>
        </SheetHeader>

        <div className="flex gap-10 w-full h-full min-h-0">
          {/* LEFT PANEL */}
          <div className="w-full flex flex-col min-h-0">
            {/* TOP CONTENT */}
            <div className="flex flex-col gap-3">
              <div className="border rounded-md px-2 flex items-center gap-2 bg-input/40">
                <Search />
                <Input className="bg-transparent! border-none p-0" placeholder="Search your interest or skills here..." onChange={handleSearch} />
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground italic">{params.search !== "" && `Matched items for "${params.search}"`}</p>
              </div>
            </div>

            {/* SCROLLABLE LIST */}
            <div className="flex-1 min-h-0">
              {isLoadingInterest ? (
                <div className="w-full h-full flex items-center justify-center">
                  <SpinnerLoader />
                </div>
              ) : interestRepository.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p>No results found.</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-2 gap-3 w-full pr-4">
                    {interestRepository.map((interest) => (
                      <div key={interest.id} className="w-full border p-4 flex items-center justify-between rounded-md hover:bg-primary">
                        <p>{interest.name}</p>
                        <Button
                          onClick={() => {
                            handleAdd(interest.id);
                          }}
                          variant={"icon"}
                          size={"icon"}
                          className="hover:bg-white hover:text-background"
                        >
                          <PlusCircle />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            {/* PAGINATION (FIXED) */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {interestRepository.length} of {pagination?.total} results
              </p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handlePrevPage} disabled={!navigation?.has_prev_page || isLoadingInterest}>
                    Previous
                  </Button>

                  <Button variant="secondary" onClick={handleNextPage} disabled={!navigation?.has_more_pages || isLoadingInterest}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full flex flex-col flex-wrap min-h-0">
            <ScrollArea className="h-full pr-4">
              <h1 className="text-2xl font-bold mb-10">Arsenal</h1>
              <div className="flex flex-wrap gap-2">
                {currentInterest.length == 0 ? (
                  <p className="text-muted-foreground">Add something to describe what you like.</p>
                ) : (
                  <>
                    {currentInterest.map((items) => (
                      <Badge key={items.id} className="text-lg h-fit mb-3 px-4 py-2 flex items-center gap-2">
                        <p> {items.name}</p>
                        <Button
                          onClick={() => {
                            handleRemove(items.id);
                          }}
                          variant={"icon"}
                          size={"icon"}
                          className="hover:bg-white hover:text-background p-2"
                        >
                          <X />
                        </Button>
                      </Badge>
                    ))}
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
