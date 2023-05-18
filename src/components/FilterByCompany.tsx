const FilterByCompany = ({
  onClickDc,
  onClickMarvel,
  isDcSelected,
  isMarvelSelected,
}: {
  onClickDc: () => void;
  onClickMarvel: () => void;
  isDcSelected: boolean;
  isMarvelSelected: boolean;
}) => {
  return (
    <div className="w-full">
      <div onClick={onClickDc}>Marvel</div>
      <div onClick={onClickMarvel}>Dc</div>
    </div>
  );
};

export default FilterByCompany;
