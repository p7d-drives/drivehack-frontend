import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarItem,
    NavbarList,
    Button
} from 'keep-react'
  
const NavbarComponent = (props) => {
  const upload = (_) => {
    let photo = document.getElementById("meow").files[0];
    let formData = new FormData();

    formData.append("file", photo);
    fetch('http://localhost:5173/api/video/upload', {method: 'POST', body: formData}).then((_) => unlock_preview());
  }
  const unlock_preview = () => props.unlock();
  return (
      <Navbar style={{margin: '1rem', borderRadius: '0.3rem'}}>
        <NavbarContainer>
          <NavbarBrand>
            <div className='text-heading-3'>p7dtTrmAI</div>
          </NavbarBrand>
          <NavbarList>
            <NavbarItem>Home</NavbarItem>
            <NavbarItem><input type="file" id="meow"/></NavbarItem>
            <NavbarItem><Button onClick={upload}>Upload</Button></NavbarItem>
          </NavbarList>
        <NavbarList>
            <div className='text-heading-3'>p7dtTrmAI</div>
        </NavbarList>
          <NavbarCollapseBtn />
          <NavbarCollapse>
            <NavbarItem>Home</NavbarItem>
            <NavbarItem onClick={upload}><input type="file" id="meow"/></NavbarItem>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
    )
  }

export default NavbarComponent;