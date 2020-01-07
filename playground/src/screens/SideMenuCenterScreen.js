const React = require('react');
const Root = require('../components/Root');
const Button = require('../components/Button');
const Text = require('react-native');
const Navigation = require('../services/Navigation');
const {
  OPEN_LEFT_SIDE_MENU_BTN,
  OPEN_RIGHT_SIDE_MENU_BTN,
  CENTER_SCREEN_HEADER
} = require('../testIDs');
const Screens = require('./Screens');

class SideMenuCenterScreen extends React.Component {
  static options() {
    return {
      topBar: {
        testID: CENTER_SCREEN_HEADER,
        title: {
          text: 'Center'
        },
        leftButtons: {
          id: 'sideMenu',
          icon: require('../../img/menu.png')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'sideMenu') this.open('left');
  }

  render() {    
    return (
      <Root componentId={this.props.componentId}>
        <Button label='Open Left' testID={OPEN_LEFT_SIDE_MENU_BTN} onPress={() => this.open('left')} />
        <Button label='Open Right' testID={OPEN_RIGHT_SIDE_MENU_BTN} onPress={() => this.open('right')} />
      </Root>
    );
  }

  open = (side) => {

    Navigation.setStackRoot(side, [
      {
        component: {
          name: Screens.SideMenuLeft, 
          id: Screens.SideMenuLeft,          
          options: {     
            topBar: {
              leftButtons: [
                {
                  id: 'leftButtonCallback',
                  text: 'Cancel',                                   
                },
              ],
              rightButtons: [{
                id: 'rightButtonCallback',
                text: 'Action',                                
              }],                
              title: {                
                text: `${side} title`,
              },            
            },            
          },
        },
      },
    ]);

    let unsubPressedListener;
    /**
     * Remove event listener
     */
    const handleDismissSideMenu = () => {
      unsubPressedListener.remove();
    }

    /**
     * Listen to click events of the buttons on the top bar of the side menu
     */
    unsubPressedListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        if (buttonId === 'leftButtonCallback') {
          console.log('Do something when left button is clicked');
          handleDismissSideMenu();
        }
        if (buttonId === 'rightButtonCallback') {
          console.log('Do something when right button is clicked');
          handleDismissSideMenu();
        }
      },
    );

    Navigation.mergeOptions(this, {
      sideMenu: {
        [side]: { visible: true }
      },    
    });
  }
}

module.exports = SideMenuCenterScreen;
