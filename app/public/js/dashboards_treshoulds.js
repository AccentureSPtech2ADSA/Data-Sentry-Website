////////////////////////////////// GRÁFICO DA RAM COM TRESHOULDS ////////////////////////////////

// ---- Transformando os dados do eixo (Y) em String
let valorMaximoGb = 100;
var listaDadosGigaByte = []
var gigaByte = 0;
var eixoYram = listaDadosGigaByte

for (;gigaByte <= valorMaximoGb; gigaByte++) {
    listaDadosGigaByte.push(`${gigaByte} %`)       
}

// ---- Labels do eixo (X)
let labels5 = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
];
// ---- Dados do eixo (Y)
let data5 = {
    labels: labels5,
    datasets: [{
        type: "line",
        backgroundColor: "#6959CD",
        borderColor: "#6959CD",
        label: "Consumo de RAM",
        data: [20, 50, 40, 45, 15, 5, 20, 20, 70 , 80],
        fill: false
    }]
};
// ---- Configurações do gráfico
let config5 = {
    type: 'line',
    data: data5,
    options: {
        responsive: true,
        smooth: true,
        lineTension: 0.5,
        maintainAspectRatio: false,
        plugins: {
            autocolors: false,
            annotation: {
                /*
                    Essas linhas de código dos Treshoulds estão organizadas
                    de forma em que segue a visualização do gráfico de cima pra baixo, ou seja:

                    1º - Pico mais alto de consumo, onde se concentra a [ Zona Crítica ]
                    2º - Pico de atenção do consumo, onde se concentra a [ Zona de Atenção ]
                    3º - Consumo IDEAL, onde se concentra a [ Zona Ideal ]
                    4º - Baixo consumo, onde se concentra a [ Zona de Atenção ]
                    5º - Consumo extremamente baixo, onde se concentra a [ Zona Crítica ]
                */
                annotations: {
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMin: 95,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica: {
                        type: 'line',
                        yMax: 95,
                        yMin: 95,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 95,
                        yMin: 80,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Ideal /////////////////
                    linha_ideal_1: {
                        type: 'line',
                        yMax: 80,
                        yMin: 80,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    zona_ideal: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 80,
                        yMin: 30,
                        backgroundColor: "rgba(46, 204, 113,0.1)"
                    },
                    linha_ideal_2: {
                        type: 'line',
                        yMax: 30,
                        yMin: 30,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 30,
                        yMin: 15,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 15,
                        yMin: 0,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica_2: {
                        type: 'line',
                        yMax: 15,
                        yMin: 15,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,                      
                    },

                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: valorMaximoGb,
                grid: {display: true},
                title: {
                    display: true,
                    text: 'Gigabyte',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                },
                ticks: {
                    callback: function(value, index, values) {
                        return eixoYram[value];
                    }
                }
            },
            x: {
                // min: '00:00',
                // max: '20:00',
                display: true,
                grid: {display: false},
                title: {
                    display: false,
                    text: 'Horário',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                }
            }
        }
    }
};
////////////////////////////////// FIM DO GRÁFICO DA RAM COM TRESHOULDS ////////////////////////////////


////////////////////////////////// GRÁFICO DA CPU COM TRESHOULDS ////////////////////////////////

let valorMaximoPorcentagem = 100;
var listaDadosPorcentagem = []
var porcentagem = 0;
var eixoYcpu = listaDadosPorcentagem

for (;porcentagem <= valorMaximoPorcentagem; porcentagem++) {
    listaDadosPorcentagem.push(`${porcentagem} %`)       
}

// ---- Labels do eixo (X)
let labels6 = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
];
// ---- Dados do eixo (Y)
let data6 = {
    labels: labels6,
    datasets: [{
        type: "line",
        backgroundColor: "#808000",
        borderColor: "#808000",
        label: "Consumo de CPU",
        data: [40, 50, 73, 64, 40, 45, 88, 88, 88 , 72],
        fill: false
    }]
};
// ---- Configurações do gráfico
let config6 = {
    type: 'line',
    data: data6,
    options: {
        responsive: true,
        smooth: true,
        lineTension: 0.5,
        maintainAspectRatio: false,
        plugins: {
            autocolors: false,
            annotation: {
                /*
                    Essas linhas de código dos Treshoulds estão organizadas
                    de forma em que segue a visualização do gráfico de cima pra baixo, ou seja:

                    1º - Pico mais alto de consumo, onde se concentra a [ Zona Crítica ]
                    2º - Pico de atenção do consumo, onde se concentra a [ Zona de Atenção ]
                    3º - Consumo IDEAL, onde se concentra a [ Zona Ideal ]
                    4º - Baixo consumo, onde se concentra a [ Zona de Atenção ]
                    5º - Consumo extremamente baixo, onde se concentra a [ Zona Crítica ]
                */
                annotations: {
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        // yMax: 100,
                        yMin: 95,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica: {
                        type: 'line',
                        yMax: 95,
                        yMin: 95,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 95,
                        yMin: 80,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Ideal /////////////////
                    linha_ideal_1: {
                        type: 'line',
                        yMax: 80,
                        yMin: 80,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    zona_ideal: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 80,
                        yMin: 30,
                        backgroundColor: "rgba(46, 204, 113,0.1)"
                    },
                    linha_ideal_2: {
                        type: 'line',
                        yMax: 30,
                        yMin: 30,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 30,
                        yMin: 15,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 15,
                        yMin: 0,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica_2: {
                        type: 'line',
                        yMax: 15,
                        yMin: 15,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,                      
                    },

                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: valorMaximoPorcentagem,
                grid: {display: true},
                title: {
                    display: true,
                    text: 'Porcentagem',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                },
                ticks: {
                    callback: function(value, index, values) {
                        return eixoYcpu[value];
                    }
                }
            },
            x: {
                // min: '00:00',
                // max: '20:00',
                display: true,
                grid: {display: false},
                title: {
                    display: false,
                    text: 'Horário',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                }
            }
        }
    }
};
////////////////////////////////// FIM DO GRÁFICO DA CPU COM TRESHOULDS ////////////////////////////////


////////////////////////////////// GRÁFICO DO DISCO COM TRESHOULDS ////////////////////////////////

var eixoYdisco = listaDadosGigaByte

// ---- Labels do eixo (X)
let labels7 = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
];
// ---- Dados do eixo (Y)
let data7 = {
    labels: labels7,
    datasets: [{
        type: "line",
        backgroundColor: "#5F9EA0",
        borderColor: "#5F9EA0",
        label: "Consumo do DISCO",
        data: [70, 70, 70, 85, 70, 63, 63, 70, 70 , 80],
        fill: false
    }]
};
// ---- Configurações do gráfico
let config7 = {
    type: 'line',
    data: data7,
    options: {
        responsive: true,
        smooth: true,
        lineTension: 0.5,
        maintainAspectRatio: false,
        plugins: {
            autocolors: false,
            annotation: {
                /*
                    Essas linhas de código dos Treshoulds estão organizadas
                    de forma em que segue a visualização do gráfico de cima pra baixo, ou seja:

                    1º - Pico mais alto de consumo, onde se concentra a [ Zona Crítica ]
                    2º - Pico de atenção do consumo, onde se concentra a [ Zona de Atenção ]
                    3º - Consumo IDEAL, onde se concentra a [ Zona Ideal ]
                    4º - Baixo consumo, onde se concentra a [ Zona de Atenção ]
                    5º - Consumo extremamente baixo, onde se concentra a [ Zona Crítica ]
                */
                annotations: {
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 100,
                        yMin: 95,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica: {
                        type: 'line',
                        yMax: 95,
                        yMin: 95,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 95,
                        yMin: 80,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Ideal /////////////////
                    linha_ideal_1: {
                        type: 'line',
                        yMax: 80,
                        yMin: 80,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    zona_ideal: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 80,
                        yMin: 30,
                        backgroundColor: "rgba(46, 204, 113,0.1)"
                    },
                    linha_ideal_2: {
                        type: 'line',
                        yMax: 30,
                        yMin: 30,
                        borderColor: 'rgba(46, 204, 113,0.5)',
                        borderWidth: 2,
                    },
                    ///////////// Treshould - Atenção /////////////////
                    zona_atencao_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 30,
                        yMin: 15,
                        backgroundColor: "rgba(255, 224, 113,0.2)"
                    },
                    ///////////// Treshould - Crítico /////////////////
                    zona_critica_2: {
                        drawTime: "beforeDatasetsDraw",
                        type: "box",
                        xMin: 0,
                        xMax: 10,
                        yMax: 15,
                        yMin: 0,
                        backgroundColor: "rgba(255, 0, 0, 0.1)"
                    },
                    linha_critica_2: {
                        type: 'line',
                        yMax: 15,
                        yMin: 15,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,                      
                    },

                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: valorMaximoGb,
                grid: {display: true},
                title: {
                    display: true,
                    text: 'Gigabyte',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                },
                ticks: {
                    callback: function(value, index, values) {
                        return eixoYdisco[value];
                    }
                }
            },
            x: {
                // min: '00:00',
                // max: '20:00',
                display: true,
                grid: {display: false},
                title: {
                    display: false,
                    text: 'Horário',
                    color: 'black',
                    font: {
                        family: 'robotic',
                        size: 11,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 10, left: 0, right: 0, bottom: 20 }
                }
            }
        }
    }
};
////////////////////////////////// FIM DO GRÁFICO DO DISCO COM TRESHOULDS ////////////////////////////////


const dataInstancia = new Date().toLocaleDateString();

function download_graph_ram(){
    const imageLink = document.createElement('a');
    const canvas_ram = document.getElementById('chartRam');
    imageLink.download = `Gráfico da RAM (${dataInstancia}).png`;
    imageLink.href = canvas_ram.toDataURL('image/png', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'"/>');
    imageLink.click();

    // console.log(canvas)
}
function download_graph_cpu(){
    const imageLink = document.createElement('a');
    const canvas_cpu = document.getElementById('chartCpu');
    imageLink.download = `Gráfico da CPU (${dataInstancia}).png`;
    imageLink.href = canvas_cpu.toDataURL('image/png', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'"/>');
    imageLink.click();

    // console.log(canvas)
}
function download_graph_disco(){
    const imageLink = document.createElement('a');
    const canvas_disco = document.getElementById('chartDisco');
    imageLink.download = `Gráfico do DISCO (${dataInstancia}).png`;
    imageLink.href = canvas_disco.toDataURL('image/png', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'"/>');
    imageLink.click();

    // console.log(canvas)
}