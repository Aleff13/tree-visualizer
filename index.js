(function(){
    
  function onChange(event) {
      var reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event){
      var obj = JSON.parse(event.target.result);
      loadChart(obj)
  }

  document.getElementById('treeInput').addEventListener('change', onChange);
}());

function hideCard() {
  const card = window.document.getElementById("form")
  card.style.display = "none"
}

function showCard() {
  const card = window.document.getElementById("form")
  card.style.display = ""
}

const dom = document.getElementById("chart-container");
const myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
const app = {};

var option;

const loadTree = (tree) => {
  const msg = tree.data.map((t, i) => `${i} - ${t.name} \n `).toString().replaceAll(",", "");
  const selectedIndex = prompt(`Selecione uma arvore pelo numero: \n ${msg}`);
  const selectedTree = tree.data[selectedIndex]

  myChart.setOption(
    (option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      legend: {
        top: "2%",
        left: "3%",
        orient: "vertical",
        data: [
          {
            name: "tree1",
            icon: "rectangle",
          }
        ],
        borderColor: "#c23531",
      },
      series: [
        {
          type: "tree",
          name: selectedTree.name,
          data: [selectedTree],
          top: "5%",
          left: "7%",
          bottom: "5%",
          right: "60%",
          symbolSize: 10,
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          collapsed: true,
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          initialTreeDepth: 1,
        },
      ],
    })
  );

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }
};

const loadChart = (obj) => {
  hideCard()

  myChart.showLoading();
  loadTree(obj)
  
  myChart.hideLoading();
};

window.addEventListener("resize", myChart.resize);
