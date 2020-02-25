const mapIntersectionToGenes = (intersections, genes) => (
  intersections.reduce((accum, intersection, index) => (
    intersection.length > 0 ? [...accum, genes[index]] : accum
  ), [])
);

export default mapIntersectionToGenes;
