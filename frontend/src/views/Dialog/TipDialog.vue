<template>
<transition name="fade">
  <div class="tip-container" :style="{left: `${left}px`, top: `${top}px`}" v-show="tipVisible">
    <div class="tip-table" :class="[sortClass]">
      <div class="tip-table-header-row tip-table-row">
        <div class="header-cell tip-table-cell">告警名称({{totalCount}})</div>
        <div class="header-cell tip-table-cell">
          首次发生时间
          <span class="caret-wrapper">
            <i class="sort-caret ascending" @click="sortData('ascending')"></i>
            <i class="sort-caret descending" @click="sortData('descending')"></i>
          </span>
        </div>
      </div>
      <el-scrollbar>
        <div class="tip-table-body">
          <el-row
            class="tip-table-body-row tip-table-row"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <el-col :span="12" class="body-cell tip-table-body-cell">{{item.name}}</el-col>
            <el-col :span="12" class="body-cell tip-table-body-cell">{{item.date}}</el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
    <div class="tip-arrow"></div>
  </div>
</transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { State } from 'vuex-class';
import { EventType, AlarmData } from "../../types/type";
import bus from "../../util/bus";
@Component
export default class TipDialog extends Vue {
  @Prop() private msg!: string;
  @Provide() private tipVisible: boolean = false;
  @Provide() private top: number = 0;
  @Provide() private left: number = 0;
  @Provide() private totalCount: number = 0;
  @Provide() private tableData: { name: string; date: string }[] = [];
  @Provide() private sortClass: string = "";
  @State((state) => state.app.alarmDatas) private alarmDatas!: AlarmData[];
  mounted() {
    bus.$on(EventType.TIPVISIBLE, (visible: boolean, name?: string, loc?: { top: number; left: number }) => {
      this.tipVisible = visible;
      this.tableData = this.alarmDatas.filter((alarmData: AlarmData) => alarmData.alarmSourceName === name).map((alarmData: AlarmData) => {
        return { name: alarmData.alarmName, date: alarmData.firstTime}
      });
      this.totalCount = this.tableData.length;
      this.sortClass = '';
      if (this.tipVisible && loc) {
        this.top = loc.top - 60;
        this.left = loc.left + 30;
      }
    });
  }
  public sortData(type: string) {
    this.sortClass = type;
    this.tableData.sort((a, b) => {
        const pre = new Date(a.date).getTime();
        const next = new Date(b.date).getTime();
        return this.sortClass === 'ascending' ? pre - next : next - pre;
    });
    this.tableData = [...this.tableData];
  }
  public formatDate(date: string) {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tip-container {
  position: absolute;
  width: 300px;
  z-index: 5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 0 8px 10px;
  .tip-arrow {
    position: absolute;
    top: 50px;
    left: -10px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    &::after {
      content: "";
      border-width: 10px;
      border-left-width: 0;
      display: block;
      border-color: transparent;
      border-style: solid;
      border-right-color: #fff;
    }
  }
}
.tip-table {
  .tip-table-header-row {
    line-height: 40px;
    font-size: 14px;
    color: #979797;
    border-bottom: 1px solid #ebeef5;
  }
  .tip-table-body-row {
    font-size: 12px;
    line-height: 28px;
  }
  .tip-table-body {
    max-height: 240px;
    padding-left: 8px;
  }
  .tip-table-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    .tip-table-cell {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      text-align: center;
    }
    .tip-table-body-cell {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
    }
  }
  .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 34px;
    width: 24px;
    cursor: pointer;
    overflow: initial;
    position: relative;
  }
  .sort-caret {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    position: absolute;
    left: 7px;
    cursor: pointer;
  }
  .sort-caret.ascending {
    border-bottom-color: #c0c4cc;
    top: 5px;
  }
  .sort-caret.descending {
    border-top-color: #c0c4cc;
    bottom: 7px;
  }
  &.ascending {
    .sort-caret.ascending {
        border-bottom-color: #409EFF;
    }
  }
  &.descending {
    .sort-caret.descending {
        border-top-color: #409EFF;
    }
  }
}
</style>
