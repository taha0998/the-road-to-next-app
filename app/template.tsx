import { RedirectToast } from "@/components/RedirectToast";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <RedirectToast />
    </div>
  );
}
