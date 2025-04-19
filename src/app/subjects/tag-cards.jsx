"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function Tags({ availableTags }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [subjectValue, setSubjectValue] = useState(undefined);
    const [examBoardValue, setExamBoardValue] = useState(undefined);
    const [resourceTypeValue, setResourceTypeValue] = useState(undefined);

    // Add open state for each select
    const [subjectOpen, setSubjectOpen] = useState(false);
    const [examBoardOpen, setExamBoardOpen] = useState(false);
    const [resourceTypeOpen, setResourceTypeOpen] = useState(false);

    // Clear and close helper
    const clearSelection = (setFunction, setOpen) => {
        setFunction("");
        setOpen(false);
    };

    useEffect(() => {
        const subject = searchParams.get('subject') ?? undefined;
        const examBoard = searchParams.get('examBoard') ?? undefined;
        const rType = searchParams.get('type') ?? undefined;
    
        setSubjectValue(subject)
        setExamBoardValue(examBoard)
        setResourceTypeValue(rType)
    }, [searchParams]); // Changed from router to searchParams

    useEffect(() => {
        // Build the query object
        const queryObj = {};
        if (subjectValue) queryObj.subject = subjectValue;
        if (examBoardValue) queryObj.examBoard = examBoardValue;
        if (resourceTypeValue) queryObj.type = resourceTypeValue;
        if (query) queryObj.query = query;
      
        // Build the query string
        const searchParams = new URLSearchParams(queryObj).toString();
      
        // Push the new URL
        router.push(searchParams ? `${pathname}?${searchParams}` : pathname);
      }, [subjectValue, examBoardValue, resourceTypeValue, router, pathname, query]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 md:h-[6rem]">
      <Select
        value={subjectValue}
        onValueChange={(value) => setSubjectValue(value)}
        open={subjectOpen}
        onOpenChange={setSubjectOpen}
      >
        <SelectTrigger className="w-full md:w-1/3 bg-[#FFFBEF] text-lg h-[6rem] py-6 border-2 border-black placeholder:text-[#999898] ring-0">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <div
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={() => clearSelection(setSubjectValue, setSubjectOpen)}
          >
            Clear
          </div>
          <SelectSeparator />
          {availableTags.subjects.map((subject, index) => (
            <SelectItem value={subject} key={index}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={examBoardValue}
        onValueChange={(value) => setExamBoardValue(value)}
        open={examBoardOpen}
        onOpenChange={setExamBoardOpen}
      >
        <SelectTrigger className="w-full md:w-1/3 bg-[#FFFBEF] text-lg h-[6rem] py-6 border-2 border-black placeholder:text-[#999898] ring-0">
          <SelectValue placeholder="Exam board" />
        </SelectTrigger>
        <SelectContent>
          <div
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={() => clearSelection(setExamBoardValue, setExamBoardOpen)}
          >
            Clear
          </div>
          <SelectSeparator />
          {availableTags.examBoards.map((examBoard, index) => (
            <SelectItem value={examBoard} key={index}>
              {examBoard}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={resourceTypeValue}
        onValueChange={(value) => setResourceTypeValue(value)}
        open={resourceTypeOpen}
        onOpenChange={setResourceTypeOpen}
      >
        <SelectTrigger className="w-full md:w-1/3 bg-[#FFFBEF] text-lg h-[6rem] py-6 border-2 border-black placeholder:text-[#999898] ring-0">
          <SelectValue placeholder="Resource Type" />
        </SelectTrigger>
        <SelectContent>
          <div
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={() =>
              clearSelection(setResourceTypeValue, setResourceTypeOpen)
            }
          >
            Clear
          </div>
          <SelectSeparator />
          {availableTags.types?.map((resourceType, index) => (
            <SelectItem value={resourceType} key={index}>
              {resourceType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
