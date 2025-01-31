interface IconProps {
  size?: number;
  path: string;
}

export function Icon({ size = 24, path }: IconProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <image height={size} width={size} path={path} className="w-12 h-12" />
    </div>
  );
}
