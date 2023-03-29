import {scaleHeight, scaleWidth} from '@utils/Size';
import {StyleSheet} from 'react-native';

export default function () {
  return StyleSheet.create({
    /* Column Layouts */
    column: {
      flexDirection: 'column',
    },
    columnReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    justifyContentEnd: {
      justifyContent: 'flex-end',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{scaleX: -1}],
    },
    rotate90: {
      transform: [{rotate: '90deg'}],
    },
    rotate90Inverse: {
      transform: [{rotate: '-90deg'}],
    },
    wW: width => ({
      width: scaleWidth(width),
    }),
    hW: height => ({
      height: scaleWidth(height),
    }),
    wH: width => ({
      width: scaleHeight(width),
    }),
    hH: height => ({
      height: scaleHeight(height),
    }),
    bgColor: color => ({
      backgroundColor: color,
    }),
    textColor: color => ({
      color: color,
    }),
    mt: margin => ({
      marginTop: scaleHeight(margin),
    }),
    mb: margin => ({
      marginBottom: scaleHeight(margin),
    }),
    ml: margin => ({
      marginLeft: scaleWidth(margin),
    }),
    mr: margin => ({
      marginRight: scaleWidth(margin),
    }),
    pt: padding => ({
      paddingTop: scaleHeight(padding),
    }),
    pb: padding => ({
      paddingBottom: scaleHeight(padding),
    }),
    pl: padding => ({
      paddingLeft: scaleWidth(padding),
    }),
    pr: padding => ({
      paddingRight: scaleWidth(padding),
    }),
    fontWeight: fontWeight => ({
      fontWeight: fontWeight,
    }),
    fontSize: fontSize => ({
      fontSize: fontSize,
    }),
  });
}
