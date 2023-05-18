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
    <div className="w-full flex py-2">
      <div className={`w-1/2 me-3 ${isMarvelSelected ? 'bg-teal-500' : 'bg-neutral-300'}`} onClick={onClickMarvel}>Marvel</div>
      <div className={`w-1/2 ${isDcSelected ? 'bg-teal-500' : 'bg-neutral-300'}`} onClick={onClickDc}>Dc</div>
    </div>
  );
};

export default FilterByCompany;
