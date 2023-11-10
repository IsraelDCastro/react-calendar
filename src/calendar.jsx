import { useState, useEffect } from "react";
import {
  format,
  addDays,
  addMonths,
  isSameDay,
  subDays,
  startOfWeek,
  isSameMonth,
  parse,
  isSameWeek,
  addWeeks
} from "date-fns";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import FadeIn from "./components/fadeIn";
import { postStatuses, posts } from "./fakedata";
import PostCard from "./components/postCard";
import ModalCalendarForm from "./components/modalCalenderForm";
import PropTypes from "prop-types";

function SelectChangeView({ setView, currentValue }) {
  return (
    <Select
      aria-label="Calendar change view"
      onChange={(event) => setView(event.target.value)}
      value={currentValue}
      defaultSelectedKeys={[currentValue]}
      className="w-40"
      size="sm"
    >
      <SelectItem key="day" value="day">
        Daily
      </SelectItem>
      <SelectItem key="week" value="week">
        Weekly
      </SelectItem>
      <SelectItem key="month" value="month">
        Montly
      </SelectItem>
    </Select>
  );
}

const commonPropTypes = {
  setView: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
};
SelectChangeView.propTypes = {
  ...commonPropTypes,
};

MonthCalendar.propTypes = {
  ...commonPropTypes
};

DayCalendar.propTypes = {
  ...commonPropTypes,
};

WeekCalendar.propTypes = {
  ...commonPropTypes
};

function MonthCalendar({
  setView,
  currentValue
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMonth(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  function getDaysInMonth() {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const days = [];

    const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

    let day = subDays(startOfFirstWeek, 1);

    for (let i = 0; i < 42; i++) {
      days.push({
        date: format(day, "yyyy-MM-dd"),
        isCurrentMonth: isSameMonth(day, firstDayOfMonth),
        isToday: isSameDay(day, new Date()),
        isSelected: isSameDay(day, selectedDate),
      });
      day = addDays(day, 1);
    }
    days.forEach((day) => {
      const postsForDay = posts.filter((post) => post.date === day.date);
      day.posts = postsForDay;
    });

    return days;
  }

  const days = getDaysInMonth();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const hanldeCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="container">
      <ModalCalendarForm isOpen={isOpen} onOpenChange={onOpenChange} />
      <header className="sticky top-0 z-50 flex flex-wrap p-5 mb-8 bg-white shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handlePrevMonth}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>

          <h2>{format(currentMonth, "MMMM yyyy")}</h2>

          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handleNextMonth}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <AnimatePresence>
            {!isSameMonth(currentMonth, new Date()) && (
              <FadeIn>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onClick={hanldeCurrentMonth}
                >
                  <i className="fa-solid fa-rotate-right"></i> Go back to month
                </Button>
              </FadeIn>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-4 basis-full">
            {postStatuses.map((item, index) => (
              <span key={index} className={item.className}>
                <span
                  className={`inline-block w-6 h-4 mr-1 rounded-md ${item.color}`}
                ></span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
        <SelectChangeView setView={setView} currentValue={currentValue} />
        <Button
          onClick={onOpen}
          size="sm"
          color="primary"
          className="ml-auto"
        >
          Create <i className="fa-regular fa-paper-plane"></i>
        </Button>
      </header>
      <div className="g:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 text-xs font-semibold text-center text-gray-700">
          <div className="py-2 bg-white border border-gray-100">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
          <div className="grid w-full grid-cols-7">
            {days.map((day) => (
              <div
                className={`flex flex-col gap-5 bg-white border border-gray-100 min-h-[5rem] md:min-h-[8rem] lg:min-h-[10rem] 2xl:min-h-[14rem] relative p-4 ${
                  day.isToday ? "bg-sky-50" : "bg-gray-50 text-gray-500"
                } ${day.isCurrentMonth && "bg-white"} ${
                  day.isSelected ? "bg-sky-50" : ""
                }`}
                onClick={() => setSelectedDate(day.date)}
                key={day.date}
              >
                <time
                  dateTime={day.date}
                  className={`
                      flex bg-slate-50 text-gray-700 h-8 w-8 items-center justify-center rounded-full text-lg
                      ${day.isToday && "!bg-sky-600 font-medium text-white"}
                      ${!day.isCurrentMonth && "text-gray-400"}
                  `}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>

                {day.posts.map((post) => (
                  <PostCard key={post.title} post={post} />
                ))}
                <Button
                  variant="flat"
                  color="primary"
                  isIconOnly
                  className="mx-auto mt-auto text-xl rounded-full"
                  onClick={onOpen}
                >
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCalendar({ setView, currentValue }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handlePrevDay() {
    setCurrentDate(addDays(currentDate, -1));
  }

  function handleNextDay() {
    setCurrentDate(addDays(currentDate, 1));
  }

  const hanldeCurrentDay = () => {
    setCurrentDate(new Date());
  };

  function getPostsForDay() {
    const days = {
      date: format(currentDate, "yyyy-MM-dd"),
      posts: [],
    };

    const postsForDay = posts.filter((post) => {
      const postDate = parse(post.date, "yyyy-MM-dd", new Date());

      return isSameDay(postDate, currentDate);
    });

    days.posts = postsForDay;

    return days;
  }

  const days = getPostsForDay();

  return (
    <div className="container">
      <ModalCalendarForm isOpen={isOpen} onOpenChange={onOpenChange} />
      <header className="sticky top-0 z-50 flex flex-wrap p-5 mb-8 bg-white shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handlePrevDay}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>

          <h2>{format(currentDate, "EEEE dd MMMM")}</h2>
          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handleNextDay}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <AnimatePresence>
            {!isSameDay(currentDate, new Date()) && (
              <FadeIn>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onClick={hanldeCurrentDay}
                >
                  <i className="fa-solid fa-rotate-right"></i> Go back to day
                </Button>
              </FadeIn>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-4 basis-full">
            {postStatuses.map((item, index) => (
              <span key={index} className={item.className}>
                <span
                  className={`inline-block w-6 h-4 mr-1 rounded-md ${item.color}`}
                ></span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
        <SelectChangeView setView={setView} currentValue={currentValue} />
        <Button onClick={onOpen} size="sm" color="primary" className="ml-auto">
          Create <i className="fa-regular fa-paper-plane"></i>
        </Button>
      </header>
      <div className="overflow-hidden rounded-lg bg-slate-50">
        <div className="px-5 py-2 shadow-sm bg-slate-100">
          <span className="text-slate-500">
            {format(currentDate, "EEEE dd MMMM")}
          </span>
        </div>
        <div className="grid w-full grid-cols-2 gap-5 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
          {days.posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WeekCalendar({ setView, currentValue }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  function getWeeklyPosts() {
    const startWeek = startOfWeek(currentWeek);

    function getPostsForDay(dayDate) {
      const postDate = parse(dayDate, "yyyy-MM-dd", new Date());

      return {
        date: format(postDate, "yyyy-MM-dd"),
        posts: posts.filter((post) =>
          isSameDay(parse(post.date, "yyyy-MM-dd", new Date()), postDate)
        ),
      };
    }

    return Array.from({ length: 7 }, (_, i) => {
      const dayDate = format(addDays(startWeek, i), "yyyy-MM-dd");
      return getPostsForDay(dayDate);
    });
  }
  const days = getWeeklyPosts();

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const hanldeCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  return (
    <div className="container">
      <ModalCalendarForm isOpen={isOpen} onOpenChange={onOpenChange} />
      <header className="sticky top-0 z-50 flex flex-wrap p-5 mb-8 bg-white shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handlePrevWeek}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>

          <h2>{`Week ${format(currentWeek, "w")} - ${format(
            currentWeek,
            "EEEE dd MMMM yyyy"
          )}`}</h2>

          <Button
            color="secondary"
            isIconOnly
            size="sm"
            variant="flat"
            onClick={handleNextWeek}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <AnimatePresence>
            {!isSameWeek(currentWeek, new Date()) && (
              <FadeIn>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onClick={hanldeCurrentWeek}
                >
                  <i className="fa-solid fa-rotate-right"></i> Go back to week
                </Button>
              </FadeIn>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-4 basis-full">
            {postStatuses.map((item, index) => (
              <span key={index} className={item.className}>
                <span
                  className={`inline-block w-6 h-4 mr-1 rounded-md ${item.color}`}
                ></span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
        <SelectChangeView setView={setView} currentValue={currentValue} />
        <Button onClick={onOpen} size="sm" color="primary" className="ml-auto">
          Create <i className="fa-regular fa-paper-plane"></i>
        </Button>
      </header>
      <div className="g:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 text-xs font-semibold text-center text-gray-700">
          <div className="py-2 bg-white border border-gray-100">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="py-2 bg-white border border-gray-100">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
          <div className="grid w-full grid-cols-7">
            {days.map((day) => (
              <div
                className={`flex flex-col gap-5 bg-white border border-gray-100 min-h-[5rem] md:min-h-[8rem] lg:min-h-[10rem] 2xl:min-h-[14rem] relative p-4 ${
                  day.isToday ? "bg-sky-50" : "bg-gray-50 text-gray-500"
                } ${day.isCurrentMonth && "bg-white"} ${
                  day.isSelected ? "bg-sky-50" : ""
                }`}
                // onClick={() => setSelectedDate(day.date)}
                key={day.date}
              >
                <time
                  dateTime={day.date}
                  className={`
                      flex bg-slate-50 text-gray-700 h-8 w-8 items-center justify-center rounded-full text-lg
                      ${day.isToday && "!bg-sky-600 font-medium text-white"}
                      ${!day.isCurrentMonth && "text-gray-400"}
                  `}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>

                {day.posts.map((post) => (
                  <PostCard key={post.title} post={post} />
                ))}
                <Button
                  variant="flat"
                  color="primary"
                  isIconOnly
                  className="mx-auto mt-auto text-xl rounded-full"
                  onClick={onOpen}
                >
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [view, setView] = useState("month");
  
  return (
    <>
      <AnimatePresence mode="wait">
        {view === "day" && (
          <FadeIn>
            <DayCalendar
              setView={setView}
              currentValue={view}
            />
          </FadeIn>
        )}
        {view === "week" && (
          <FadeIn>
            <WeekCalendar
              setView={setView}
              currentValue={view}
            />
          </FadeIn>
        )}
        {view === "month" && (
          <FadeIn>
            <MonthCalendar
              setView={setView}
              currentValue={view}
            />
          </FadeIn>
        )}
      </AnimatePresence>
    </>
  );
}
