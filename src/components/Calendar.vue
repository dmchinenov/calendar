<template>
  <div class="calendar">
    <div class="calendar__header">
      <i
        id="arrow-dec"
        class="gg-arrow-left calendar__arrow"
        @click="changeMonth($event.target)" />
      <span class="calendar__header-date">
        {{ nameOfCurrentMonth }}
      </span>
      <i
        id="arrow-inc"
        class="gg-arrow-right calendar__arrow"
        @click="changeMonth($event.target)" />
    </div>
    <div class="calendar__days-week">
      <div
        v-for="day in namesDaysOfWeek"
        :key="day"
        class="calendar__day-week">
        {{ day }}
      </div>
    </div>
    <div class="calendar__days-month">
      <div
        v-for="(day, index) in daysList"
        :key="index"
        class="calendar__day-month"
        :class="[
          day.disabled ? 'calendar__day-month_hidden' : '',
          day.active ? 'calendar__day-month_active' : '',
        ]"
        @click="setDate(day.value)">
        {{ day.value }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import localization from '@/localization/localization.json';

export default {
  props: {
    lang: {
      type: String,
      default: 'ru',
    },
    handlerDate: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    localization: null,
    date: null,
    daysList: null,
  }),
  created() {
    this.localization = localization;
    this.defaultSetDate();
  },
  mounted() {
    this.createDaysList();
  },
  methods: {
    defaultSetDate() {
      this.date = moment();
      this.selectedDate = this.date.format('DD-MM-YYYY');
      this.$emit('setDate', this.date);
    },
    createDaysList() {
      const hiddenDays = [];
      const daysMonth = [];

      const indexFirstDayInWeek = this.date.date(1).isoWeekday() - 1;
      for (let i = 0; i < indexFirstDayInWeek; i++) {
        const obj = {
          value: '',
          disabled: true,
          fulldate: false,
        };
        hiddenDays.push(obj);
      }

      for (let i = 1; i <= this.date.daysInMonth(); i++) {
        const fulldate = moment(this.date).set('date', i).format('DD-MM-YYYY');
        const obj = {
          value: i,
          disabled: false,
          fulldate,
          active: fulldate === this.selectedDate,
        };
        daysMonth.push(obj);
      }

      this.daysList = hiddenDays.concat(daysMonth);
    },
    setDate(value) {
      const repeatSelectedDate = this.selectedDate === this.date.set('date', value).format('DD-MM-YYYY');
      if (repeatSelectedDate) {
        this.daysList.find((item) => item.fulldate === this.selectedDate).active = false;
        this.selectedDate = null;
        this.$emit('setDate', null);
        return;
      }

      const oldDate = this.daysList.find((item) => item.fulldate === this.selectedDate);
      if (oldDate) {
        oldDate.active = false;
      }

      this.date.set('date', value);
      this.$emit('setDate', this.date);
      this.selectedDate = this.date.format('DD-MM-YYYY');
      this.daysList.find((item) => item.fulldate === this.selectedDate).active = true;
    },
    changeMonth(event) {
      this.date = event.id === 'arrow-inc'
        ? moment(this.date).add(1, 'M')
        : moment(this.date).subtract(1, 'M');
      this.createDaysList();
    },
  },
  computed: {
    namesDaysOfWeek() {
      return this.localization[this.lang].namesDaysOfWeek;
    },
    nameOfCurrentMonth() {
      const numberOfCurrentMonth = moment(this.date).format('M') - 1;
      return `${this.localization[this.lang].namesMonths[numberOfCurrentMonth].toUpperCase()} ${moment(this.date).format('YYYY')}`;
    },
  },
  watch: {
    handlerDate() {
      const validDate = moment(this.handlerDate, 'YYYY-MM-DD', true).isValid();
      if (validDate) {
        this.date = moment(this.handlerDate);
        this.selectedDate = this.date.format('DD-MM-YYYY');
        this.createDaysList();
        this.date.set('date', moment(this.handlerDate).format('DD'));
        this.$emit('setDate', this.date);
      }
      if (this.handlerDate === '') {
        this.defaultSetDate();
        this.createDaysList();
      }
    },
  },
};
</script>

<style lang="scss">
.calendar {
  background: $onyx;
  height: 320px;
  border-radius: 5px;
  box-shadow: 0px 2px 7px 0px rgb(50 50 50 / 75%);
  padding: 30px 40px;
}

.calendar__header {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

.calendar__header-date {
  color: $redorange;
  width: 150px;
  font-weight: 300;
  text-align: center;
}

.calendar__days-week {
  display: flex;
  align-items: center;
  padding: 20px 0px 0px;
}

.calendar__day-week {
  color: $redorange;
  font-weight: 300;
  width: 40px;
  text-align: center;
}

.calendar__days-month {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
}

.calendar__day-month {
  font-weight: 300;
  color: $platinum;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}

.calendar__day-month:hover {
  border: 1px solid rgba($redorange, 0.5);
}

.calendar__arrow {
  cursor: pointer;
  color: $redorange;
}

.calendar__day-month_hidden {
  visibility: hidden;
}

.calendar__day-month_active {
  background: $redorange;
}

</style>
