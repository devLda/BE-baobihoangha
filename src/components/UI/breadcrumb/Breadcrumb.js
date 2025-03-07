import { Link } from "react-router-dom";


const Breadcrumb = (props) => {
  const { titles } = props;
  return (
    <nav class={`flex h-10`} aria-label="Breadcrumb">
      <ol class="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <Link
            to="/"
            class={`inline-flex items-center text-lg font-medium text-yellow-600 hover:text-blue-600 dark:text-white dark:hover:text-yellow-600`}
          >
            <svg
              aria-hidden="true"
              class="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Trang chủ
          </Link>
        </li>
        {titles &&
          titles?.map((item, index) => (
            <li>
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link
                  to={item?.link}
                  key={index}
                  class={`ml-1 text-lg font-medium text-yellow-600 hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-yellow-700`}
                >
                  {item?.ten}
                </Link>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
