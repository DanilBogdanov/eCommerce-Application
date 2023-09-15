import './logo.css';

interface ILogoProps {
  color: string;
  width: string;
}

export default function Logo({ color, width }: ILogoProps) {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      viewBox='0 0 863 346'
      className='logo'
      data-testid='logo'
    >
      <g fill={color}>
        <path d='M152 2C93.5 10.1 45.5 45.6 20.6 99.3c-6 12.7-10 24.8-8.7 25.6.7.5.3 4.2-1.4 11.7-1.8 7.6-2.7 15.3-3.2 25.4-.3 8-.3 14.3 0 14 .3-.3 1.3-7.3 2.2-15.5.8-8.3 2-16.6 2.5-18.5 1.1-3.9 1.1-4.4-1 14-1 8.5-1.4 21.7-.6 20.9.2-.2.9-6.7 1.5-14.4 1.9-24 7.3-43.9 17.5-64.3 11.7-23.7 30.7-45 53.5-60.3 21.1-14.2 40.3-21.6 67.1-26 24.6-4.1 53-.2 80.4 11 25.8 10.6 50.8 30.4 66.9 53.1 19.5 27.6 29.5 59.1 29.6 93.5.1 30.5-6.8 57.7-20.5 81.7-7.9 13.6-21.8 32.3-23.4 31.3-.3-.2-3.1 2.2-6.1 5.3-3 3.1-3.6 4-1.3 1.9 2.2-2 4.3-3.5 4.6-3.1.4.3 4.4-3 8.9-7.3 6.3-5.9 7.8-7 6.3-4.4-5.2 9-24.5 26.7-40.9 37.3-4.9 3.2-8.5 5.8-8 5.8.6 0-1.6 1.5-4.7 3.4-7.6 4.3-8.3 5.2-2.2 2.5 8-3.5 25-14 33.2-20.5 19.9-15.9 38.3-39.3 46.8-59.7 11.1-26.9 16.3-48.9 16.5-70 0-5.1.4-11 .9-13.2 1.6-6.8.2 27.1-1.5 37-2 12.2-6.2 28.5-8.6 34-.4 1.1-2 4.7-3.4 8s-4.7 9.8-7.2 14.5c-2.6 4.7-4.6 8.7-4.4 8.8.1.2-.6 1-1.6 1.8-1 .7-1.4 1.4-.9 1.4.6 0 .1.7-1 1.6-1 .8-1.2 1.3-.4.9.8-.4.5.2-.7 1.3s-2 2.2-1.8 2.4c1 1-16 20.1-23.8 26.9-28.5 24.7-60.9 38.3-100.2 41.9l-9 .9 12-.3c13.5-.3 13.4-.1-1.5 1.9l-10.5 1.4 12.5-.4c14-.4 25.5-2.6 41.9-8.1 46-15.3 86-53.6 103.5-98.9 14.6-37.9 15.3-83.4 2-123.3-13.1-39.2-46.5-76.4-85.7-95.6C222.9 7 202.6 2 176 1.5c-9.6-.2-20.4 0-24 .5zM16.7 125.2c-.3.8-.6.5-.6-.6-.1-1.1.2-1.7.5-1.3.3.3.4 1.2.1 1.9zm-1.9 7.6c-.6 2.9-1.3 5-1.6 4.7-.2-.2.1-2.7.8-5.5.7-2.8 1.4-4.9 1.6-4.7.3.2-.1 2.7-.8 5.5zm321.9 17.4c-.3.8-.6.5-.6-.6-.1-1.1.2-1.7.5-1.3.3.3.4 1.2.1 1.9zM310 271.4c0 .2-.8 1-1.7 1.7-1.6 1.3-1.7 1.2-.4-.4 1.3-1.6 2.1-2.1 2.1-1.3zm-4.9 6.4c-1.1 1.6-2.8 3.5-3.8 4.3-.9.8-.2-.5 1.7-2.9 3.8-4.8 5.2-5.7 2.1-1.4zm-22.1 5.6c0 .2-.8 1-1.7 1.7-1.6 1.3-1.7 1.2-.4-.4 1.3-1.6 2.1-2.1 2.1-1.3zm8.5 9.6c-7.8 7.9-24.5 22-24.5 20.7 0-.3 3.9-3.6 8.8-7.5 4.8-3.9 12.1-10.4 16.2-14.6 4.1-4.2 7.7-7.6 8-7.6.2 0-3.6 4.1-8.5 9zm-90.2 47.7c-.7.2-1.9.2-2.5 0-.7-.3-.2-.5 1.2-.5s1.9.2 1.3.5z' />
        <path d='M91.1 63.9c-1.7 3-1.5 215.3.1 216.9 1.6 1.6 80.2 1.7 91.4.1 47.3-6.6 80.3-34.8 91.4-78.3 4.3-17.1 4.6-41.4.5-58.9-8.2-35.3-31.2-61.6-64.6-73.8-18.9-6.9-21.7-7.2-72.1-7.6-44.9-.4-45.7-.4-46.7 1.6zm95.5 46.2c9.8 3 20.6 10 25.8 16.6 4.9 6.3 9.1 15.3 11.3 23.9 2.3 9.4 2.3 33.2 0 42.6-5.1 21-16.9 34.2-36 40.5-7.5 2.4-9.9 2.7-27.4 3.1l-19.3.4V106.8l18.8.4c16.1.4 19.8.8 26.8 2.9zM556.1 77.6c-16.6 4.4-32.9 20.8-33.4 33.6l-.2 4 11.3 3.3c10.1 2.9 11.4 3.1 11.9 1.6 2.9-9.4 6.9-14.5 13.8-17.7 11.7-5.5 25.6-1.2 29.4 8.9 1.6 4.2 1.3 13.3-.5 17-3.1 6.1-8.6 11.8-37.5 38.9L522 194.3V213l48.3-.2 48.2-.3.3-11.8.3-11.7h-28.2c-15.4 0-27.9-.4-27.7-.8.2-.4 8.7-8.6 19.1-18.1 19.3-17.9 26.2-25.8 30.4-34.8 9.1-19.6 1.7-43.4-16.5-53.1-11.1-5.9-28-7.9-40.1-4.6zM796.1 77.6c-14.7 3.9-27.5 15.2-32.5 28.5-3.1 8.2-2.6 8.8 10.1 12.4l11.2 3.2 1.8-5.1c2.3-6.6 9.4-14 14.8-15.5 10.2-2.8 20-.2 25.1 6.5 2.6 3.4 2.9 4.5 2.9 11.3 0 7-.3 8.1-3.4 12.9-2 3.2-15 16.2-33.7 33.8L762 194.3V213h96v-24h-27.5c-16.2 0-27.5-.4-27.5-.9s1.2-1.9 2.6-3c6.3-5 31.5-28.9 37.2-35.4 10.9-12.4 14.9-23.9 13.1-38-2.8-22.1-20.6-35.8-46.4-35.6-4.4 0-10.4.7-13.4 1.5zM390 145.5v67.7l34.8-.5c21.9-.3 36.5-.9 39.7-1.7 2.8-.6 8.7-3 13.3-5.1 14.3-6.9 24.9-19.3 30.8-36.4 2.6-7.4 2.8-9.2 2.9-23 0-17.1-1.2-23.3-7.3-35.5-4.5-9.3-14.9-20-23.9-24.8-12.6-6.6-17.9-7.4-56-7.9l-34.3-.5v67.7zm71.4-40.5c15 5.7 23.7 20.3 23.7 39.5.1 24.3-12 40.6-32.2 43.5-3.5.5-13.3 1-21.6 1H416V101.7l19.8.5c17.4.5 20.4.8 25.6 2.8zM624.6 78.9c-.3.5 4.4 13.4 10.4 28.7 6.1 15.4 14.4 36.4 18.5 46.9 4.1 10.4 10.9 27.8 15.2 38.5l7.8 19.5H705.2L711 198c3.1-8 11-28 17.5-44.5s15.8-40.1 20.7-52.3c4.8-12.3 8.8-22.5 8.8-22.7 0-.2-6.5-.4-14.5-.4-13.1-.2-14.6 0-15.2 1.6-1.4 4-21.5 57.3-23.8 63.3-3.7 9.3-10.4 26.9-11.4 30.2-.7 2.1-1.6 4-2 4.2-.4.3-9.3-22-19.7-49.5L652.5 78h-13.7c-7.5 0-13.9.4-14.2.9zM21.6 248.3c.3 1 .9 1.5 1.2 1.2.3-.3 0-1.1-.7-1.8-1-.9-1.1-.8-.5.6z' />
        <path d='M25.5 255.5c11.4 20.3 28.4 39.8 45.5 52.4 3.9 2.8 3.8 2.6-1-1.6-18.1-15.9-28-27.1-38.5-43.4-7.5-11.6-10.2-15-6-7.4zM447.7 265.2c-.8 2.4-3.6 9.9-6.1 16.7-2.5 6.8-4.6 12.7-4.6 13.2s1.8.9 4 .9c3.4 0 4.2-.4 5-2.5.9-2.3 1.5-2.5 7-2.5s6.1.2 7 2.5c.8 2.1 1.6 2.5 5 2.5 2.2 0 4-.3 4-.6 0-.4-2.8-8.3-6.2-17.5l-6.1-16.9H453c-3.5 0-3.8.3-5.3 4.2zm7.1 12.7c1.7 5.5 1.5 6.1-1.8 6.1-2.1 0-3-.5-3-1.7 0-2.2 2.2-8.3 3-8.3.4 0 1.2 1.7 1.8 3.9zM473.7 261.6c-.4.4-.7 2-.7 3.6 0 2.7.2 2.8 4.5 2.8h4.5v21h-4.5c-4.5 0-4.5 0-4.5 3.5v3.5h26v-3.5c0-3.5 0-3.5-4.5-3.5H490v-21h4.6c4.5 0 4.5 0 4.2-3.3l-.3-3.2-12.1-.3c-6.6-.1-12.3.1-12.7.4zM523.6 262.6c-.3.9-.6 8-.6 15.9s.3 15 .6 15.9c.5 1.3 2.2 1.6 8.3 1.6 13.8-.1 20.2-5.2 20.9-16.5.6-12.1-6.6-18.5-20.9-18.5-6.1 0-7.8.3-8.3 1.6zm17.2 7.6c5.8 2.9 4.9 14.8-1.4 17.4-7.1 3-7.4 2.7-7.4-9.2v-10.6l3.3.7c1.7.3 4.2 1.1 5.5 1.7zM738.8 272c-5.5 7.8-7.8 11.9-7.8 14v3h7.5c6.7 0 7.5.2 7.5 1.9 0 3.8 1.1 5.1 4.5 5.1 3.3 0 4.5-1.3 4.5-5 0-1 .9-2 2-2.3 1.4-.3 2-1.4 2-3.1 0-1.9-.5-2.6-2-2.6-1.9 0-2-.7-2-9.4 0-11.9-.3-12.6-4.9-12.6-3.5 0-3.9.5-11.3 11zm7.6 7c-.3 3.9-.6 4.2-3.8 3.8l-2.6-.3 2.6-3.7c3.1-4.3 4.1-4.2 3.8.2zM782 273.2c0 9.7.4 13 1.8 15.7 4.9 9.8 19 10.7 25.6 1.8 1.9-2.5 2.1-4.3 2.1-16v-13.2l-3.4-.3c-2-.2-3.7.2-4.2 1-.5.7-.9 6.4-.9 12.5 0 11-.1 11.3-2.6 12.9-1.9 1.3-3.2 1.5-5.2.8-4.1-1.5-5.2-4.7-5.2-16.7V261h-8v12.2zM559.8 271.7c-1.6.4-1.8 1.9-1.8 12.4V296h8v-6.6c0-3.6.5-7.4 1-8.5 1.5-2.6 6.6-2.6 8 .1 1.9 3.6 9.7 2.2 8.4-1.6-2.6-8-9-10.9-14.7-6.4-2.5 2-2.5 2-3 0-.5-1.9-2.2-2.3-5.9-1.3zM595.2 272.5c-4.1 1.8-7.7 9-6.7 13.6 2 9.1 13.3 13.5 21.3 8.3 2.2-1.4 2.2-1.7.8-3.3-1.3-1.4-2.7-1.7-6.4-1.4-3.3.3-5.3 0-6.7-1.1-1.9-1.4-1.4-1.5 6.6-1.6 9.7 0 10.3-.4 8.9-6.4-1.8-8.2-9.5-11.7-17.8-8.1zm9.8 7c1.1 1.3.5 1.5-4.1 1.5-5-.1-5.2-.2-3.5-1.5 2.5-1.9 6-1.9 7.6 0zM624.5 272.2c-2.7 1.4-4.5 3.8-4.5 6 0 1.4.8 1.8 3.3 1.8 1.8 0 3.8-.5 4.4-1.1 1.3-1.3 5.4-.8 5.4.6 0 .5-1.7 1.3-3.8 1.8-8.8 1.7-11.9 4.6-10.8 9.8 1.2 5.5 9.5 7.1 15.3 3.1 2.6-1.9 3.2-2 3.2-.8 0 1.7 4.1 3.1 6.5 2.2 1.9-.7 1.9-5.5 0-6.2-1.1-.5-1.5-2.2-1.5-6.6 0-5.2-.3-6.3-2.9-8.9-2.5-2.4-3.7-2.9-7.8-2.9-2.6 0-5.7.6-6.8 1.2zm8.4 16.4c-1.3 1.6-5.8 1.6-6.2-.1-.3-1.3 6.7-3.6 7.1-2.4.2.6-.2 1.6-.9 2.5zM651.3 271.7c-1 .3-1.3 3.8-1.3 12.4V296h7v-9c0-8.3.1-9 2-9s2 .7 2 9v9h6.9l.3-8.7c.3-7.4.6-8.8 2.1-9.1 1.5-.3 1.7.6 1.7 8.8v9.1l3.8-.3 3.7-.3.3-7.6c.4-9.6-1.3-15-5.1-16.3-2-.7-3.4-.7-4.7.1-1.4.9-2.6.9-4.8.1-2.3-.9-3.7-.9-5.5-.1-1.4.7-2.8.9-3.1.5-.9-.8-3.8-1.1-5.3-.5zM689.7 272.6c-3.4 1.9-5 5.5-3.7 8.8 1.1 3.1 2.1 3.7 8.9 5 3.1.6 5.6 1.5 5.6 2.1 0 1.7-6.1 1.7-7.5.1-1.8-2.3-8-2.1-8 .2 0 5.1 7.1 8.9 14.3 7.8 5.5-.9 8.7-4 8.7-8.3 0-3.9-2.5-5.9-9.4-7.2-5.8-1.1-6.6-1.8-3.5-2.9 2.6-1 4.9-.5 4.9.9 0 .5 1.8.9 4 .9 4.9 0 5.3-1.9 1.1-6.1-2.5-2.4-3.7-2.9-7.8-2.9-2.6.1-6.1.8-7.6 1.6zM87 312.4c0 .2.7.7 1.6 1 .8.3 1.2.2.9-.4-.6-1-2.5-1.4-2.5-.6zM91.7 315.1c.7.7 1.5 1 1.8.7.3-.3-.2-.9-1.2-1.2-1.4-.6-1.5-.5-.6.5zM82 315.4c0 .3.9 1 2 1.6 1.1.6 2 .8 2 .6 0-.3-.9-1-2-1.6-1.1-.6-2-.8-2-.6zM99.4 319.4c1.1.9 2.4 1.6 3 1.6 1.2 0 .7-.5-2.4-1.9-2.4-1.1-2.4-1.1-.6.3zM111 325c.8.5 2 1 2.5 1 .6 0 .3-.5-.5-1s-1.9-1-2.5-1c-.5 0-.3.5.5 1zM116 333c.8.5 2 1 2.5 1 .6 0 .3-.5-.5-1s-1.9-1-2.5-1c-.5 0-.3.5.5 1zM121 335c.8.5 2.2.9 3 .9 1 0 .8-.3-.5-.9-2.7-1.2-4.3-1.2-2.5 0zM204 336c-.8.5-1 1-.5 1 .6 0 1.7-.5 2.5-1s1.1-1 .5-1c-.5 0-1.7.5-2.5 1zM127.5 337c1.1.5 2.9.8 4 .8 1.6 0 1.5-.2-.5-.8-3.4-1.1-6-1.1-3.5 0zM194.8 337.7c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zM134.8 338.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zM187.8 338.7c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4zM171.3 339.7c2 .2 5.4.2 7.5 0 2-.2.3-.4-3.8-.4s-5.8.2-3.7.4zM157.7 341.7c1.8.2 5 .2 7 0 2.1-.2.7-.4-3.2-.4-3.8 0-5.5.2-3.8.4z' />
      </g>
    </svg>
  );
}
