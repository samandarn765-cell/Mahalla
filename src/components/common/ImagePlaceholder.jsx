import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const ImagePlaceholder = ({
  src,
  alt = 'Rasm joyi',
  className = '',
  placeholderText = "Rasm",
  icon: CustomIcon
}) => {
  const [hasError, setHasError] = useState(!src);

  if (!hasError && src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full min-h-[120px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-950 border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center select-none group transition-all duration-300 hover:border-cyan-400/50 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all mb-2 shadow-inner">
        {CustomIcon ? <CustomIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
      </div>
      <span className="text-[11px] font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
        {alt || placeholderText}
      </span>
    </div>
  );
};
