import SectionHeader from "../Common/SectionHeader";

export const PricingHeader: React.FC<{ hasHeader?: boolean }> = ({
  hasHeader = true,
}) => {
  return (
    <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
      <div className="animate_top mx-auto text-center">
        <SectionHeader
          headerInfo={{
            title: hasHeader ? `PRICING PLANS` : ``,
            subtitle: `Simple Pricing`,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.`,
          }}
        />
      </div>
    </div>
  );
};
