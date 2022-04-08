import { SVGProps } from 'react';

function Error(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="157.62 158.879 50 50" {...props}>
      <circle
        style={{ fill: '#D75A4A' }}
        cx="25"
        cy="25"
        r="25"
        transform="matrix(1, 0, 0, 1, 157.619644, 158.879089)"
      />
      <polyline
        style={{
          fill: 'none',
          stroke: 'rgb(255, 255, 255)',
          strokeLinecap: 'round',
          strokeMiterlimit: 10,
          strokeWidth: '4px',
        }}
        points="16,34 25,25 34,16 &#10;&#9;"
        transform="matrix(1, 0, 0, 1, 157.619644, 158.879089)"
      />
      <polyline
        style={{
          fill: 'none',
          stroke: 'rgb(255, 255, 255)',
          strokeLinecap: 'round',
          strokeMiterlimit: 10,
          strokeWidth: '4px',
        }}
        points="16,16 25,25 34,34 &#10;&#9;"
        transform="matrix(1, 0, 0, 1, 157.619644, 158.879089)"
      />
    </svg>
  );
}

export default Error;
