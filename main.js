const $siteList = $(".siteList");
const $last = $siteList.find(".last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {
    logo: "B",

    url: "https://www.bilibili.com/",
  },
  { logo: "B", url: "https://www.baidu.com/" },
];
const removeX = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    const $li = $(`
<li>
<div class="site">
<div class="logo">${node.logo}</div>
<div class="link">${removeX(node.url)}</div>
<div class="close">
<svg class="icon" aria-hidden="true">
<use xlink:href="#icon-Close"></use>
</svg>
</div>
</div>
</li>
`).insertBefore($last);

    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入您要添加的网址");
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
    console.log(url);
  }
  document.querySelectorAll;
  hashMap.push({
    logo: removeX(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  console.log(e);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

let btn = document.getElementById("btn");

btn.onblur = () => {
  if (btn.value === "") {
    btn.value = "请输入您要搜索的信息";
  }
};

btn.onfocus = () => {
  if (btn.value === "请输入您要搜索的信息") {
    btn.value = "";
  }
};
