const sortingFunction = (a, b) => {
  if (sorting_value === "lowest") {
    return a.price - b.price;
  }

  if (sorting_value === "highest") {
    return b.price - a.price;
  }

  if (sorting_value === "a-z") {
    return a.name.localeCompare(b.name);
  }

  if (sorting_value === "z-a") {
    return b.name.localeCompare(a.name);
  }
};

export default sortingFunction;
