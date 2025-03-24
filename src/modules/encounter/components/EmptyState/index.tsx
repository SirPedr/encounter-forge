import { Button } from "@/components/ui/button";
import EmptyStateIllustration from "../../../../../public/illustrations/EmptyStateIllustration.svg";

type Props = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: Props) => (
  <section className="flex flex-col items-center">
    <EmptyStateIllustration />

    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="mt-2 mb-4">{description}</p>
  </section>
);
