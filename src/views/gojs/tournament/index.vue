<template>
  <div class="app-container">
    <div
      id="myDiagramDiv"
      style="border: 1px solid black; background: rgb(77, 77, 77); width: 700px; height: 600px; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
    >
      <canvas
        tabindex="0"
        width="698"
        height="598"
        style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 698px; height: 598px; cursor: auto;"
      >
        This text is displayed if your browser does not support the Canvas HTML
        element.
      </canvas>
      <div
        style="position: absolute; overflow: auto; width: 698px; height: 598px; z-index: 1;"
      >
        <div style="position: absolute; width: 1px; height: 1px;"></div>
      </div>
    </div>
    <p>
      Click on the empty score boxes next to names to fill in scores for each
      player. The scores must be non-negative numbers with at most 3 digits.
      Scores are validated using a
      <a>TextEditingTool.textValidation</a> function. When two players in a
      "game" have a score, one of them will automatically advance to the next
      round of the bracket.
    </p>
  </div>
</template>

<script>
import go from "gojs";
export default {
  name: "Linear",
  components: {},
  data() {
    return {
      myDiagram: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var $ = go.GraphObject.make; // for conciseness in defining templates
      this.myDiagram = $(
        go.Diagram,
        "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
          "textEditingTool.starting": go.TextEditingTool.SingleClick,
          "textEditingTool.textValidation": this.isValidScore,
          layout: $(go.TreeLayout, { angle: 180 }),
          "undoManager.isEnabled": true
        }
      );

      // define a simple Node template
      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        { selectable: false },
        $(
          go.Shape,
          "Rectangle",
          { fill: "#8C8C8C", stroke: null },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color")
        ),
        $(
          go.Panel,
          "Table",
          $(go.RowColumnDefinition, { column: 0, separatorStroke: "black" }),
          $(go.RowColumnDefinition, {
            column: 1,
            separatorStroke: "black",
            background: "#BABABA"
          }),
          $(go.RowColumnDefinition, { row: 0, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: "black" }),
          $(
            go.TextBlock,
            "",
            {
              row: 0,
              wrap: go.TextBlock.None,
              margin: 5,
              width: 90,
              isMultiline: false,
              textAlign: "left",
              font: "10pt  Segoe UI,sans-serif",
              stroke: "white"
            },
            new go.Binding("text", "player1").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              row: 1,
              wrap: go.TextBlock.None,
              margin: 5,
              width: 90,
              isMultiline: false,
              textAlign: "left",
              font: "10pt  Segoe UI,sans-serif",
              stroke: "white"
            },
            new go.Binding("text", "player2").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 1,
              row: 0,
              wrap: go.TextBlock.None,
              margin: 2,
              width: 25,
              isMultiline: false,
              editable: true,
              textAlign: "center",
              font: "10pt  Segoe UI,sans-serif",
              stroke: "black"
            },
            new go.Binding("text", "score1").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 1,
              row: 1,
              wrap: go.TextBlock.None,
              margin: 2,
              width: 25,
              isMultiline: false,
              editable: true,
              textAlign: "center",
              font: "10pt  Segoe UI,sans-serif",
              stroke: "black"
            },
            new go.Binding("text", "score2").makeTwoWay()
          )
        )
      );
      // define the Link template
      this.myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal,
          selectable: false
        },
        $(go.Shape, { strokeWidth: 2, stroke: "white" })
      );

      this.makeModel([
        "Adler",
        "Pollock",
        "Montgomery",
        "Lestrade",
        "Wilson",
        "Moran",
        "Bardle",
        "Edwards"
      ]);
    },
    // validation function for editing text
    isValidScore(textblock, oldstr, newstr) {
      if (newstr === "") return true;
      var num = parseInt(newstr, 10);
      return !isNaN(num) && num >= 0 && num < 1000;
    },
    // Generates the original graph from an array of player names
    createPairs(players) {
      if (players.length % 2 !== 0) players.push("(empty)");
      var startingGroups = players.length / 2;
      var levelGroups = [];
      var currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
      for (var i = 0; i < startingGroups; i++) {
        levelGroups.push(currentLevel + "-" + i);
      }
      var totalGroups = [];
      this.makeLevel(levelGroups, currentLevel, totalGroups, players);
      return totalGroups;
    },
    makeLevel(levelGroups, currentLevel, totalGroups, players) {
      currentLevel--;
      var len = levelGroups.length;
      var parentKeys = [];
      var parentNumber = 0;
      var p = "";
      for (var i = 0; i < len; i++) {
        if (parentNumber === 0) {
          p = currentLevel + "-" + parentKeys.length;
          parentKeys.push(p);
        }
        if (players !== null) {
          var p1 = players[i * 2];
          var p2 = players[i * 2 + 1];
          totalGroups.push({
            key: levelGroups[i],
            parent: p,
            player1: p1,
            player2: p2,
            parentNumber: parentNumber
          });
        } else {
          totalGroups.push({
            key: levelGroups[i],
            parent: p,
            parentNumber: parentNumber
          });
        }
        parentNumber++;
        if (parentNumber > 1) parentNumber = 0;
      }
      // after the first created level there are no player names
      if (currentLevel >= 0)
        this.makeLevel(parentKeys, currentLevel, totalGroups, null);
    },
    makeModel(players) {
      var model = new go.TreeModel(this.createPairs(players));
      model.addChangedListener(e => {
        if (e.propertyName !== "score1" && e.propertyName !== "score2") return;
        var data = e.object;
        if (isNaN(data.score1) || isNaN(data.score2)) return;
        // TODO: What happens if score1 and score2 are the same number?
        // both score1 and score2 are numbers,
        // set the name of the higher-score'd player in the advancing (parent) node
        // if the data.parentNumber is 0, then we set player1 on the parent
        // if the data.parentNumber is 1, then we set player2
        var parent = this.myDiagram.findNodeForKey(data.parent);
        if (parent === null) return;
        var playerName =
          parseInt(data.score1) > parseInt(data.score2)
            ? data.player1
            : data.player2;
        if (parseInt(data.score1) === parseInt(data.score2)) playerName = "";
        this.myDiagram.model.setDataProperty(
          parent.data,
          data.parentNumber === 0 ? "player1" : "player2",
          playerName
        );
      });
      this.myDiagram.model = model;
      // provide initial scores for at most three pairings
      for (var i = 0; i < Math.min(3, model.nodeDataArray.length); i++) {
        var d = model.nodeDataArray[i];
        if (d.player1 && d.player2) {
          // TODO: doesn't prevent tie scores
          model.setDataProperty(d, "score1", Math.floor(Math.random() * 100));
          model.setDataProperty(d, "score2", Math.floor(Math.random() * 100));
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
