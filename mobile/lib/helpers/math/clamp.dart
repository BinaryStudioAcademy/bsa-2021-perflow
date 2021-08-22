double clamp(
  double value,
{
  double min = 0,
  double max = 1
}) {
  if(value < min) {
    return min;
  }

  if(value > max) {
    return max;
  }

  return value;
}
