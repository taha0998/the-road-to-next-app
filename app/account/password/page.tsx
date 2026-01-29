import { Heading } from "@/components/Heading";
import { AccountTabs } from "@/features/account/components/AccountTabs";

const PasswordPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default PasswordPage;
