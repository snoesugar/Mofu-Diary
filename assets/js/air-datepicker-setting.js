import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

// 語系資料
const zh = {
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  daysShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  daysMin: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  today: "今天",
  clear: "清除",
  format: "yyyy/mm/dd",
  timeFormat: "hh:mm aa",
  firstDay: 0,
};

// 設定停用日期
const disabledDate = [];

// 加入月曆
const dp = new AirDatepicker("#airDatepicker", {
  inline: true,
  locale: zh,
  navTitles: {
    days: `
        <div class="custom-nav-title">
        <span class="nav-month" style="color: #000000; font-size: 17px; font-weight: 600; line-height: 24px;">MMMM </span>
        <span class="nav-year" style="color: #000000; font-size: 17px; font-weight: 600; line-height: 24px;">yyyy</span>
        <span class="small-icon" style="color: #BC8035; font-size: 24px; font-weight: 600; line-height: 24px;">›</span>
        </div>
      `,
  },
  showOtherMonths: false,
});
dp.disableDate(disabledDate);