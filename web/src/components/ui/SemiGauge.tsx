interface SemiGaugeProps {
  value: number; // 0.0 – 1.0
  color: string; // hex
  size?: number; // px (default 120)
  strokeWidth?: number;
}

export function SemiGauge({
  value,
  color,
  size = 50,
  strokeWidth = 4,
}: SemiGaugeProps) {
  const cx = size / 2;
  const cy = size * 0.58;
  const r = size / 2 - strokeWidth / 2;

  function arc(from: number, to: number) {
    const x1 = cx + r * Math.cos(from),
      y1 = cy - r * Math.sin(from);
    const x2 = cx + r * Math.cos(to),
      y2 = cy - r * Math.sin(to);
    const large = from - to > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  const fillAngle = Math.PI - Math.PI * Math.min(value, 1);

  return (
    <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
      <path
        d={arc(Math.PI, 0)}
        fill="none"
        stroke="rgba(0,0,0,0.7)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={arc(Math.PI, fillAngle)}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{ transition: "all 0.2s ease-out" }}
      />
    </svg>
  );
}
