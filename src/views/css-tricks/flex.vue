<template>
  <div class="app-container flex-container">
    <div class="flex-attribute flex-wrap">
      <div class="example-container">
        <div class="title">wrap</div>
        <div class="example wrap">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div>
        </div>
      </div>
      <div class="example-container">
        <div class="title">nowrap</div>
        <div class="example no-wrap">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div>
        </div>
      </div>
    </div>
    <div class="flex-attribute justify-content">
      <div class="example-container">
        <div class="title">flex-start</div>
        <div class="example flex-start">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
      <div class="example-container">
        <div class="title">flex-end</div>
        <div class="example flex-end">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
      <div class="example-container">
        <div class="title">center</div>
        <div class="example center">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
      <div class="example-container">
        <div class="title">space-between</div>
        <div class="example space-between">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
      <div class="example-container">
        <div class="title">space-around</div>
        <div class="example space-around">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
      <div class="example-container">
        <div class="title">space-evenly</div>
        <div class="example space-evenly">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
          <!-- <div class="block block4"></div>
          <div class="block block5"></div>
          <div class="block block6"></div>
          <div class="block block7"></div>
          <div class="block block8"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Flex"
};
</script>
<style lang="scss" scoped>
.block {
  background: black;
  margin-right: 10px;
  // TODO: 是否有height
  height: 10px;
}
.block1 {
  width: 30px;
}
.block2 {
  width: 20px;
}
.block3 {
  width: 40px;
}
.block4 {
  width: 30px;
}
.block5 {
  width: 25px;
}
.block6 {
  width: 35px;
}
.block7 {
  width: 45px;
}
.block8 {
  width: 35px;
}
.flex-container {
  // display: flex;
  // flex-wrap: wrap;
  .flex-attribute {
    display: flex;
    flex-wrap: wrap;
    & .example-container {
      margin-right: 30px;
      margin-bottom: 30px;
      .example {
        display: flex;
        padding: 10px;
        padding-right: 0px;
        width: 200px;
        // TODO: 有height与无height
        height: 200px;
        border-radius: 8px;
        border: 1px solid grey;
      }
    }
    &.flex-wrap .example-container {
      .example {
        &.no-wrap {
          flex-wrap: nowrap;
        }
        &.wrap {
          flex-wrap: wrap;
        }
      }
    }
    &.justify-content .example-container {
      .example {
        &.flex-start {
          justify-content: flex-start;
        }
        &.flex-end {
          justify-content: flex-end;
        }
        &.center {
          justify-content: center;
        }
        &.space-between {
          justify-content: space-between;
        }
        &.space-around {
          justify-content: space-around;
        }
        &.space-evenly {
          justify-content: space-evenly;
        }
      }
    }
  }
}
</style>
