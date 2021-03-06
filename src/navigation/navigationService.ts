import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function push(routeName, params) {
  navigator.push(
    StackActions.push({
      routeName,
      params,
    })
  );
}

function goBack(params) {
  navigator.push(
    StackActions.pop({
      params,
    })
  );
}

export default {
  navigate,
  push,
  goBack,
  setTopLevelNavigator,
};