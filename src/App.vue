<template>
  <div class="table-repsonive">
    <table class="table table-striped table-bordered table-condensed">
      <thead>
        <tr>
          <th
            v-for="header in [
              'Area',
              'Effective',
              'Rescinded',
              'Press Release',
              'Rescinsion Release',
              'Last Updated',
            ]"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, fields: record } in records" :key="id">
          <td v-text="record.area" />

          <td v-text="new Date(record.effectiveAt).toLocaleString()" />

          <td>
            <template v-if="record.rescinded">
              <strong>Yes</strong>, this notice is no longer in effect
            </template>
            <template v-else>
              <strong>No</strong>, this notice is in effect
            </template>
          </td>

          <td>
            <a v-if="record.releaseUrl" :href="record.releaseUrl"
              >Press Release</a
            >
            <span v-else>
              -
            </span>
          </td>

          <td>
            <a
              v-if="record.rescinsionReleaseUrl"
              :href="record.rescinsionReleaseUrl"
              >Rescinsion Release</a
            >
            <span v-else>
              -
            </span>
          </td>

          <td v-text="new Date(record.updatedAt).toLocaleString()" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  install(Vue) {
    Vue.prototype.$airtable = require('./airtable')
    Vue.component('HcBoilWaterNotices', this)
  },

  data: () => ({
    records: [],
  }),

  async mounted() {
    try {
      // https://airtable.com/appPNfSpl4rulv7fg/api/docs#curl/table:notices:list
      const { data } = await this.$airtable.get(`/notices`, {
        params: {
          view: 'Grid view',
        },
      })
      this.records = data.records
    } catch (error) {
      // handle error
    }
  },
}
</script>
