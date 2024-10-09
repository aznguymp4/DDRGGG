module.exports = {
  judgeColors: {
    mv: "#ddddff",
    pf: "#ffff22",
    gr: "#49ca3a",
    gd: "#419af0",
    background: "#232428",
    ms: "#fe4141",
    ok: "#ddddffdd",
    ng: "#480008",
  },
  gauges:{//Marv, Perf, Grt, Good, ?,  Miss,  OK,   NG
    //      0     1     2    3     4   5      6     7
    a3flare1: {
      gain: [0,    0, -20, -100, 0, -1000,   0, -1000],
      initVal: 10000,
      bgGradient: [[0,"fde328"], [1,"ca860c"]],
      gradientAngled: false,
      name: "(A3) Flare I",
      xLines: 5
    },
    a3flare2: {
      gain: [0,    0, -29, -145, 0, -1100,   0, -1100],
      initVal: 10000,
      bgGradient: [[0,"efb21d"], [1,"bd6007"]],
      gradientAngled: false,
      name: "(A3) Flare II",
      xLines: 5
    },
    a3flare3: {
      gain: [0,    0, -38, -190, 0, -1200,   0, -1200],
      initVal: 10000,
      bgGradient: [[0,"faa925"], [1,"c04d0b"]],
      gradientAngled: false,
      name: "(A3) Flare III",
      xLines: 5
    },
    a3flare4: {
      gain: [0,    0, -56, -280, 0,-1400,   0, -1400],
      initVal: 10000,
      bgGradient: [[0,"f2751f"], [1,"b12f09"]],
      gradientAngled: false,
      name: "(A3) Flare IV",
      xLines: 5
    },
    flare1: {
      gain: [0,    0, -10,  -50, 0,  -150,   0,  -150],
      initVal: 10000,
      bgGradient: [[0,"146aff"], [1,"1e29c9"]],
      gradientAngled: false,
      name: "Flare I",
      xLines: 5
    },
    flare2: {
      gain: [0,    0, -10,  -63, 0,  -300,   0,  -300],
      initVal: 10000,
      bgGradient: [[0,"21d7fd"], [1,"8ccffc"]],
      gradientAngled: false,
      name: "Flare II",
      xLines: 5
    },
    flare3: {
      gain: [0,    0, -12,  -75, 0,  -450,   0,  -450],
      initVal: 10000,
      bgGradient: [[0,"5bf677"], [1,"0abc28"]],
      gradientAngled: false,
      name: "Flare III",
      xLines: 5
    },
    flare4: {
      gain: [0,    0, -29, -145, 0, -1100,   0, -1100],
      initVal: 10000,
      bgGradient: [[0,"ffe627"], [1,"e78007"]],
      gradientAngled: false,
      name: "Flare IV",
      xLines: 5
    },
    flare5: {
      gain: [0,    0, -74, -370, 0, -1600,   0, -1600],
      initVal: 10000,
      bgGradient: [[0,"fa4728"], [1,"AF2A1C"]],
      gradientAngled: false,
      name: "Flare V",
      xLines: 5
    },
    flare6: {
      gain: [0,    0, -92, -460, 0, -1800,   0, -1800],
      initVal: 10000,
      bgGradient: [[0,"9128fa"], [1,"7300cd"]],
      gradientAngled: false,
      name: "Flare VI",
      xLines: 10
    },
    flare7: {
      gain: [0,    0,-128, -640, 0, -2200,   0, -2200],
      initVal: 10000,
      bgGradient: [[0,"dbae76"], [1,"d19954"]],
      gradientAngled: false,
      name: "Flare VII",
      xLines: 10
    },
    flare8: {
      gain: [0,    0,-164, -820, 0, -2600,   0, -2600],
      initVal: 10000,
      bgGradient: [[0,"b6effa"], [1,"8cc0de"]],
      gradientAngled: false,
      name: "Flare VIII",
      xLines: 10
    },
    flare9: {
      gain: [0,    0,-200,-1000, 0, -3000,   0, -3000],
      initVal: 10000,
      bgGradient: [[0,"a86387"], [1,"88466a"]],
      gradientAngled: false,
      name: "Flare IX",
      xLines: 10
    },
    flarex: {
      gain: [0, -100,-200,-1000, 0, -3000,   0, -3000],
      initVal: 10000,
      bgGradient: [[0,"F97C7F"],[.05,"FF7FAA"],[.1,"EB7DFA"],[.165,"937FFF"],[.215,"5AC5FF"],[.29,"65FFE3"],[.36,"5DEE5E"],[.45,"E3EC75"],[.55,"E3EC75"],[.64,"5DEE5E"],[.71,"65FFE3"],[.785,"5AC5FF"],[.835,"937FFF"],[.9,"EB7DFA"],[.95,"FF7FAA"],[1,"F97C7F"]],
      gradientAngled: true,
      name: "Flare EX",
      xLines: 10
    },
    life4:  {
      gain: [0,    0,   0,    0, 0, -2500,   0, -2500],
      initVal: 10000,
      bgGradient: [[0,"44F69F"],[.5,"44F69F"],[.6,"7EFF80"],[.7,"FFDD46"],[.8,"FF8800"],[1,"FF0C0C"]],
      gradientAngled: false,
      name: "LIFE4",
      xLines: 4
    },
    life8:  {
      gain: [0,    0,   0,    0, 0, -1250,   0, -1250],
      initVal: 10000,
      bgGradient: [[0,"44F69F"],[.6,"44F69F"],[.7,"7EFF80"],[.8,"FFDD46"],[.9,"FF8800"],[1,"FF0C0C"]],
      gradientAngled: false,
      name: "LIFE8",
      xLines: 8
    },
    risky:  {
      gain: [0,    0,   0,    0, 0,-10000,   0,-10000],
      initVal: 10000,
      bgGradient: [[0,"FFB046"], [.5,"FF4900"], [1,"C60000"]],
      gradientAngled: true,
      name: "RISKY",
      xLines: 1
    },
    normal: {
      gain: [10000/43, 10000/44, 10000/45, 0, 0, -10000/12, 0, -10000/20],
      initVal: 5000,
      bgGradient: [[0,"20FFAE"], [.25,"00A56A"], [.5,"49FFB5"], [.75,"00A56A"], [1,"49FFB5"]],
      gradientAngled: true,
      name: "≈ Normal",
      xLines: 5
    },
    grade:  {
      gain: [10000/225, 10000/230, 10000/235, 0, 0, -10000/35, 0, -10000/50],
      initVal: 10000,
      bgGradient: [[0,"F8FF23"], [.125,"E7A400"], [.25,"F8FF23"], [.375,"E7A400"], [.5,"F8FF23"], [.625,"E7A400"], [.75,"F8FF23"], [.875,"E7A400"], [1,"F8FF23"]],
      gradientAngled: true,
      name: "≈ Grade",
      xLines: 10
    },
  },
  imageConfig: {
    minWidth: 1920,
    height: 480,
    judgementBarHeight: 50
  }
}