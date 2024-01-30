import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Circle,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    padding: '16px',
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '60%',
    alignItems: 'center',
  },
  section2: {
    width: '40%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    paddingHorizontal: '16px',
    paddingVertical: '8px',
    borderRadius: '9999px',
  },
})

export default function CourtPDF() {
  return (
    <Document pageMode='fullScreen'>
      <Page size={'A4'} orientation='landscape'>
        <View style={styles.page}>
          <View style={styles.section1}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Producto</Text>
              <Text style={styles.title}>Cantidad</Text>
              <Text style={styles.title}>Precio</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Producto</Text>
              <Text style={styles.title}>Cantidad</Text>
              <Text style={styles.title}>Precio</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ESTIMADOS</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
