<template>
  <div id="app">
    <div class="main">
      <span class="main__date-label">{{ labelSelectedDate }} </span>
      <Calendar
        :lang="selectedLang"
        :handler-date="handlerDate"
        @setDate="setDate" />
      <span class="main__label">{{ labelInput }}</span>
      <input
        v-model="handlerDate"
        type="text"
        pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
        class="main__input"
        placeholder="YYYY-MM-DD">
      <span class="main__label">{{ labelSelectLang }}</span>
      <select
        v-model="selectedLang"
        class="main__lang-select">
        <option
          v-for="lang in appLangs"
          :key="lang.value"
          :value="lang.value">
          {{ lang.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import localization from './localization/localization.json';
import Calendar from './components/Calendar.vue';

export default {
  name: 'App',
  components: { Calendar },
  data: () => ({
    selectedLang: 'ru',
    selectedDate: null,
    handlerDate: null,
  }),
  created() {
    this.localization = localization;
  },
  methods: {
    setDate(value) {
      if (!value) {
        this.selectedDate = null;
        return;
      }
      this.selectedDate = value.format('DD/MM/YYYY');
    },
  },
  computed: {
    appLangs() {
      return [
        {
          label: 'Русский',
          value: 'ru',
        },
        {
          label: 'English',
          value: 'en',
        },
      ];
    },
    labelSelectedDate() {
      return this.selectedDate ? this.selectedDate : this.localization[this.selectedLang].dateLabel;
    },
    labelSelectLang() {
      return this.localization[this.selectedLang].langLabel;
    },
    labelInput() {
      return this.localization[this.selectedLang].inputDateLabel;
    },
  },
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: whitesmoke;
}

.main__lang-select {
  margin-top: 5px;
  width: 200px;
  height: 30px;
  border: none;
}

.main__date-label {
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 20px;
}

.main__label {
  padding-top: 20px;
}

.main__input {
  width: 200px;
  height: 20px;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 10px;
}

.main__input:focus {
  outline: none;
}

.main__input:valid:not(:placeholder-shown) {
  border: 2px solid green;
}

.main__input:invalid:not(:placeholder-shown) {
  border: 2px solid $redorange;
}

</style>
