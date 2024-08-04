const Headline = ({ title, highlight }) => {
      return (
        <div className="lg:text-[25px] md:text-[24px] sm:text-[22px]  font-semibold text-primary capitalize leading-[1]  ">
          <h2>
            {title}
            <span className="text-secondary ml-2">{highlight}</span>
          </h2>
        </div>
      );
    };
    
    export default Headline;