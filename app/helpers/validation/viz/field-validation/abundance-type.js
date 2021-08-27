const acceptedAbundanceTypes = {
  bidirectional: true,
  negative: true,
  positive: true,
};

const validateAbundanceType = (abundanceType, defaultAbundanceType) => (
  acceptedAbundanceTypes[abundanceType] ? abundanceType : defaultAbundanceType
);

export default validateAbundanceType;
