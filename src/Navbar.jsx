import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarItem,
    NavbarList,
} from 'keep-react'
  
const NavbarComponent = () => {
    return (
      <Navbar style={{margin: '1rem', borderRadius: '0.3rem'}}>
        <NavbarContainer>
          <NavbarBrand>
            <div className='text-heading-3'>GoidaAI</div>
          </NavbarBrand>
          <NavbarList>
            <NavbarItem>Home</NavbarItem>
            <NavbarItem>Uploads</NavbarItem>
          </NavbarList>
        <NavbarList>
            <div className='text-heading-3'>GoidaAI</div>
        </NavbarList>
          <NavbarCollapseBtn />
          <NavbarCollapse>
            <NavbarItem>Home</NavbarItem>
            <NavbarItem>Uploads</NavbarItem>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
    )
  }

export default NavbarComponent;