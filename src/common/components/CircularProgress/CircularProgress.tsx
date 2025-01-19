import classnames from 'classnames/bind';
import styles from './circularProgress.module.scss';

const cn = classnames.bind(styles);

const CircularProgress = ({ size = 40, thickness = 4, color = '#00e86b' }) => {
  const radius = (size - thickness) / 2; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레

  return (
    <div
      className={cn('circular-progress')}
      style={{ width: size, height: size }}
    >
      <svg
        className={cn('circular-progress__svg')}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* 배경 원 */}
        <circle
          className={cn('circular-progress__bg')}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        {/* 애니메이션 되는 원 */}
        <circle
          className={cn('circular-progress__bar')}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={`${circumference * 0.75}, ${circumference}`}
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
