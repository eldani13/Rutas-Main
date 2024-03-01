import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { Corte } from '@/types/corteResponse'

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    gap: '12px',
    padding: '24px',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '32px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '24px',
    textTransform: 'uppercase',
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
    width: '100%',
  },
  span: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#222',
    fontSize: '14px',
  },
  text: {
    fontSize: '14px',
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: '#222',
    margin: '16px 0',
  },
  column: {
    width: '100%',
    borderColor: '#222',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderCollapse: 'collapse',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderColor: '#222',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'row',
  },
  tableHeader: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '16px',
    color: 'gray',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '8px',
    alignItems: 'center',
  },
})

interface props {
  corte: Corte
}

export default function CourtPDF({ corte }: props) {
  return (
    <Document pageMode='fullScreen'>
      <Page size={'A4'} orientation='portrait' wrap={true} style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sistema de Corte</Text>
        </View>

        <Text style={styles.text}>
          <Text style={styles.span}>Ruta: </Text>
          {corte.ruta}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.span}>Empleado: </Text>
          {corte.empleado}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.span}>Vehiculo asignado: </Text>
          {corte.vehiculo}
        </Text>

        <View style={styles.line}></View>

        <Text style={styles.subtitle}>Vendidos</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Productos</Text>
            {corte.productosVendidos.map((product: any, index:number) => (
              <Text style={styles.text} key={"textSale-products-" + index}>{product.nombre}</Text>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Cantidad</Text>
            {corte.productosVendidos.map((product: any, index:number) => (
              <Text style={styles.text} key={"textSale-cantidad-" + index}>{product.cantidad}</Text>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Precio</Text>
            {corte.productosVendidos.map((product: any, index:number) => (
              <Text style={styles.text} key={"textSale-price-" + index}>{product.precio}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.subtitle}>No Vendidos</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Productos</Text>
            {corte.productosNoVendidos.map((product: any, index:number) => (
              <Text style={styles.text} key={"textNoSale-products-" + index}>{product.nombre}</Text>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Cantidad</Text>
            {corte.productosNoVendidos.map((product: any, index:number) => (
              <Text style={styles.text}  key={"textNoSale-cantidad-" + index}>{product.cantidad}</Text>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.tableHeader}>Precio</Text>
            {corte.productosNoVendidos.map((product: any, index:number) => (
              <Text style={styles.text}  key={"textNoSale-price-" + index}>{product.precio}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.subtitle}>Estimados</Text>
        <View style={styles.row}>
          <Text style={styles.span}>Salio con: </Text>
          <Text style={styles.text}>{corte.estimados.salio}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.span}>Vendio: </Text>
          <Text style={styles.text}>{corte.estimados.vendio}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.span}>Entrego en efectivo: </Text>
          <Text style={styles.text}>{corte.estimados.efectivo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.span}>Entrego en mercancia: </Text>
          <Text style={styles.text}>{corte.estimados.mercancia}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.span}>LA DIFERENCIA ES DE: </Text>
          <Text style={styles.text}>{corte.estimados.diferencia}</Text>
        </View>
      </Page>
    </Document>
  )
}
