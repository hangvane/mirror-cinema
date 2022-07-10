<template>
  <a-table
    :dataSource="Logger.logList"
    :columns="columns"
    :pagination="false"
    :show-header="Logger.logList.length > 0"
    :scroll="{ x: 'max-content', y: '50vh' }"
    size="small"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'level'">
        {{ t('logPanel.level') }}
      </template>
      <template v-if="column.key === 'time'">
        {{ t('logPanel.time') }}
      </template>
      <template v-if="column.key === 'body'">
        <a-row justify="space-between" align="middle">
          <a-col> {{ t('logPanel.logTitle') }} </a-col>
          <a-col>
            <a-button size="small" @click="Logger.clear()" danger>
              {{ t('logPanel.clearLog') }}
            </a-button>
          </a-col>
        </a-row>
      </template>
    </template>
    <template
      #bodyCell="{
        column,
        record: { event, time },
      }: {
        column: TableColumnType<LogItem>,
        record: LogItem,
      }"
    >
      <template v-if="column.key === 'level'">
        <a-tag :color="LogLevelColorMapping[event.level]">
          {{ event.level.toUpperCase() }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'time'">
        <a-typography-text>
          {{ format(time, 'HH:mm:ss') }}
        </a-typography-text>
        <a-typography-text type="secondary" class="millisecond">
          {{ format(time, '.SSS') }}
        </a-typography-text>
      </template>
      <template v-else-if="column.key === 'body'">
        <a-typography-text
          :style="{
            color: strToColor(event.argumentArray[0]).str,
            fontFamily: 'Menlo',
          }"
        >
          {{ `[${event.argumentArray[0]}:${event.argumentArray[1]}] ` }}
        </a-typography-text>

        <a-typography-text copyable>
          {{ event.argumentArray.slice(2).join(' ') }}
        </a-typography-text>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { Logger, availableLogLevels } from '/@/utils/Logger';
import { LogItem, LogLevelColorMapping } from '/@/api/types';
import type { TableColumnType } from 'ant-design-vue';
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';
import { strToColor } from '/@/utils/Utils';
const { t } = useI18n();

const columns: TableColumnType<LogItem>[] = [
  {
    dataIndex: ['event', 'level'],
    key: 'level',
    width: '5rem',
    align: 'center',
    fixed: 'left',
    filters: availableLogLevels.map((v) => ({
      text: v.toUpperCase(),
      value: v,
    })),
    onFilter: (value, record: LogItem) => record.event.level === value,
  },
  {
    dataIndex: 'time',
    key: 'time',
    width: '7rem',
    align: 'center',
  },
  {
    dataIndex: 'event',
    key: 'body',
  },
];
</script>

<style scoped lang="less">
.ant-tag {
  margin-right: unset;
}
.millisecond {
  font-size: 0.8rem;
}
</style>
