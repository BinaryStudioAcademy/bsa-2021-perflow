double linearClamp({
  required double t,
  double lowerThreshold = 0,
  double upperThreshold = 1
}) {
  if(lowerThreshold >= upperThreshold) {
    throw ArgumentError("Lower threshold can't be bigger than upper threshold");
  }

  if(t < lowerThreshold) {
    return 0;
  }

  if(t > upperThreshold) {
    return 1;
  }

  return (t - lowerThreshold) / (upperThreshold - lowerThreshold);
}
