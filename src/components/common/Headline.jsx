import { cn } from "../../lib/utils";

const Headline = ({ title, highlight, className }) => {
  return (
    <div className=
      {cn(
        "lg:text-[25px] md:text-[24px] sm:text-[22px]  font-semibold text-primary capitalize leading-[1]", className)}>
      <h2>
        {title}
        <span className="text-secondary ml-2">{highlight}</span>
      </h2>
    </div>
  );
};

export default Headline;