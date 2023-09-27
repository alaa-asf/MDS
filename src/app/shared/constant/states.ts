export const state:any  = {
    'NJF':'iq-na',
    'KRB':'iq-ka',
    'BAS':'iq-ba',
    'SAM':'iq-mu',
    'DWN':'iq-qa',
    'NAS':'iq-dq',
    'AMA':'iq-ma',
    'KOT':'iq-wa',
    'SAH':'iq-sd',
    'SMH':'iq-su',
    'DYL':'iq-di',
    'BBL':'iq-bb',
    'BGD':'iq-bg',
    'ANB':'iq-an',
    'ARB':'iq-ar',
    'KRK':'iq-ts',
    'DOH':'iq-da',
    'MOS':'iq-ni'
}
export const codeToString:any  = {
    'NJF':'Najaf',
    'KRB':'Karbala',
    'BAS':'Basra',
    'SAM':'Muthanna',
    'DWN':'Al-Qādisiyyah',
    'NAS':'Dhi Qar',
    'AMA':'Maysan',
    'KOT':'Wasit',
    'SAH':'Salah Al-Din',
    'SMH':'Sulaymaniyah',
    'DYL':'Diyala',
    'BBL':'Babil',
    'BGD':'Baghdad',
    'ANB':'Al-Anbar',
    'ARB':'Erbil',
    'KRK':'Kirkuk',
    'DOH':'Duhok',
    'MOS':'Ninawa'
}
export const stringToCode:any  = {
    'Najaf': 'NJF',
    'Karbala': 'KRB',
    'Basra': 'BAS',
    'Muthanna': 'SAM',
    'Al-Qādisiyyah': 'DWN',
    'Dhi Qar': 'NAS',
    'Maysan': 'AMA',
    'Wasit': 'KOT',
    'Salah Al-Din': 'SAH',
    'Sulaymaniyah': 'SMH',
    'Diyala': 'DYL',
    'Babil': 'BBL',
    'Baghdad': 'BGD',
    'Al-Anbar': 'ANB',
    'Erbil': 'ARB',
    'Kirkuk': 'KRK',
    'Duhok': 'DOH',
    'Ninawa': 'MOS'
}
export const permissionsArray:any=
    [
    { key: '', value: 'Dashboard' },
        { key: 'logistics/alloperations', value: 'logistics' },
        { key: 'users', value: 'ITBOSS' },
        { key: 'roles', value: 'ITBOSS' },
        { key: 'permissions', value: 'ITBOSS' }
    ]
export const permissionsIndex:any={
    'Dashboard': '',
    'All Data': 'all-data',
    'Merchants': 'merchants',
    'Customers': 'customers',
    'Database Connections': 'db-connection',
    'Users': 'users',
    'Roles': 'roles',
    'Permissions': 'permissions'
}
