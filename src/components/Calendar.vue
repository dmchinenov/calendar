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
        @click="setDate(day.value)"
        @mouseenter="changeEventDisplay(day)"
        @mouseleave="changeEventDisplay(day)">
        <div class="calendar__day-events">
          <div
            v-for="event in day.events"
            :key="event.id"
            :style="{background: badgeColor[event.type]}"
            class="calendar__day-event" />
        </div>
        <span> {{ day.value }}</span>
        <div
          v-if="day.showEvent && day.events"
          class="calendar__event-preview">
          <div
            v-for="event in day.events"
            :key="event.id"
            class="calendar__event-name"
            :style="{background: event.type}">
            {{ event.event }}
          </div>
        </div>
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
    events: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    localization: null,
    date: null,
    daysList: null,
    showEvent: false,
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
        const events = this.events ? this.events.filter((el) => el.date === fulldate) : false;
        const obj = {
          value: i,
          disabled: false,
          fulldate,
          active: fulldate === this.selectedDate,
          events: events.length > 0 ? events : false,
          showEvent: false,
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
    changeEventDisplay(day) {
      const { showEvent } = this.daysList.find((el) => el.value === day.value);
      this.daysList.find((el) => el.value === day.value).showEvent = !showEvent;
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
    badgeColor() {
      return {
        yellow: 'yellow',
        green: 'green',
        red: 'red',
      };
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
  padding: 20px 0px 10px;
}

.calendar__day-week {
  color: $redorange;
  font-weight: 300;
  width: 80px;
  margin: 0px 5px;
  text-align: center;
}

.calendar__days-month {
  display: flex;
  flex-wrap: wrap;
  width: calc(80px + 10px) * 7;
}

.calendar__day-month {
  font-weight: 300;
  color: $platinum;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  border: 1px solid rgba(white, 0.1);
  margin: 5px;
}

.calendar__day-month:hover {
  border: 1px solid rgba($redorange, 0.5);
}

.calendar__day-events {
  position: absolute;
  top: 5px;
  right: 5px;
}

.calendar__day-event {
  width: 8px;
  height: 8px;
  margin: 5px;
  background: white;
  border-radius: 10px;
}

.calendar__event-preview {
  position: absolute;
  min-width: 200px;
  background: white;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  display: block;
  top: 0px;
  left: 85px;
  z-index: 1;
  max-height: 200px;
  overflow: hidden
}

.calendar__event-name {
  color: $onyx;
  display: block;
  margin: 5px;
  padding: 2px;
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
