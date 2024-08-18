import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '../firebase/config';
import {useSelector} from 'react-redux';

const RelatorioProjeto = () => {
  const id = useSelector(state => state.pesquisa.id);

  const [votos, setVotos] = useState({
    pessimo: 0,
    ruim: 0,
    neutro: 0,
    bom: 0,
    excelente: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pesquisaRef = doc(db, 'pesquisas', id);
        const docPesquisa = await getDoc(pesquisaRef);

        if (docPesquisa.exists()) {
          const votosData = docPesquisa.data().votos;
          setVotos(votosData);
        } else {
          console.log('Documento não encontrado!');
        }
      } catch (error) {
        console.log('Erro ao obter os votos:', error);
      }
    };

    fetchData();
  }, []);

  const widthAndHeight = 300;
  const colorMap = {
    pessimo: '#D71616',
    ruim: '#FF360A',
    neutro: '#FFC632',
    bom: '#37BD6D',
    excelente: '#25BC22',
  };

  const series = [
    {value: votos.pessimo, color: colorMap.pessimo},
    {value: votos.ruim, color: colorMap.ruim},
    {value: votos.neutro, color: colorMap.neutro},
    {value: votos.bom, color: colorMap.bom},
    {value: votos.excelente, color: colorMap.excelente},
  ];

  const filteredSeries = series
    .filter(item => item.value > 0)
    .map(item => item.value);
  const filteredColors = series
    .filter(item => item.value > 0)
    .map(item => item.color);

  const hasValidData = filteredSeries.length > 0;

  return (
    <View style={styles.view}>
      {hasValidData ? (
        <PieChart
          widthAndHeight={widthAndHeight}
          series={filteredSeries}
          sliceColor={filteredColors}
        />
      ) : (
        <Text style={styles.noDataText}>
          Não há dados para gerar o gráfico.
        </Text>
      )}

      {hasValidData ? (
        <View style={styles.containerList}>
          <View style={styles.containerItem}>
            <View style={styles.square5} />
            <Text style={styles.textoLegenda}>Excelente</Text>
          </View>

          <View style={styles.containerItem}>
            <View style={styles.square4} />
            <Text style={styles.textoLegenda}>Bom</Text>
          </View>

          <View style={styles.containerItem}>
            <View style={styles.square3} />
            <Text style={styles.textoLegenda}>Neutro</Text>
          </View>

          <View style={styles.containerItem}>
            <View style={styles.square2} />
            <Text style={styles.textoLegenda}>Ruim</Text>
          </View>

          <View style={styles.containerItem}>
            <View style={styles.square1} />
            <Text style={styles.textoLegenda}>Pessimo</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#372775',
    padding: 20,
  },
  noDataText: {
    fontSize: 36,
    color: '#ffffff',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  textoLegenda: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'AveriaLibre-Regular',
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square1: {
    width: 20,
    height: 20,
    backgroundColor: '#D71616',
    marginRight: 15,
  },
  square2: {
    width: 20,
    height: 20,
    backgroundColor: '#FF360A',
    marginRight: 15,
  },
  square3: {
    width: 20,
    height: 20,
    backgroundColor: '#FFC632',
    marginRight: 15,
  },
  square4: {
    width: 20,
    height: 20,
    backgroundColor: '#37BD6D',
    marginRight: 15,
  },
  square5: {
    width: 20,
    height: 20,
    backgroundColor: '#25BC22',
    marginRight: 15,
  },
  containerList: {
    marginTop: 70,
  },
});

export default RelatorioProjeto;
