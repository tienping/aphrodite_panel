const dataGroup = {
    sysvar: {
        'success': true,
        'message': 'menu read successfully.',
        'result': {
            'page': {
                'base': 'https://hermo-test.herokuapp.com:1337/',
                'path': 'postgres/menu',
            },
            'meta': {
                'totalCount': 3,
                'currentPage': 1,
                'perPage': 10,
                'pageCount': 1,
            },
            'result': [
                {
                    key: 'bolder',
                    category: '10',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '10',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
            ],
        },
    },
    partner: {
        'success': true,
        'message': 'partner read successfully.',
        'result': {
            'page': {
                'base': 'https://hermo-test.herokuapp.com:1337/',
                'path': 'postgres/menu',
            },
            'meta': {
                'totalCount': 3,
                'currentPage': 1,
                'perPage': 10,
                'pageCount': 1,
            },
            'result': [
                {
                    id: '1',
                    name: 'hermamak cook manman',
                    logo: 'http://www.findthatlogo.com/wp-content/gallery/mercedes-logos/mercedes-logo.jpg',
                    status: true,
                    industry: 'F&B',
                    url: 'http://www.hermamak.com',
                },
                {
                    id: '2',
                    name: 'wahahha lai makan',
                    logo: 'https://en.opensuse.org/images/4/49/Amarok-logo-small.png',
                    status: false,
                    industry: 'F&B',
                    url: 'http://www.laimakan.com',
                },
                {
                    id: '3',
                    name: 'bo jio',
                    logo: 'https://www.humanrightslogo.net/sites/default/files/HRLogoCMYKsmall.jpg',
                    status: true,
                    industry: 'Booking',
                    url: 'http://www.jioandjio.com',
                },
            ],
        },
    },
    reward: {
        'success': true,
        'message': 'reward read successfully.',
        'result': {
            'page': {
                'base': 'https://hermo-test.herokuapp.com:1337/',
                'path': 'postgres/menu',
            },
            'meta': {
                'totalCount': 3,
                'currentPage': 1,
                'perPage': 10,
                'pageCount': 1,
            },
            'result': [
                {
                    id: '1',
                    name: 'get 1 free',
                    remarks: 'once in lifetime',
                    tnc_text: 'only for living being',
                    event_code: 'mamaklife',
                    url: 'http://www.hermamak.com',
                    created_by: 'tplim',
                    created_at: 1548143096400,
                    updated_by: 'tplim',
                    updated_at: 1548143096400,
                    start_date: 1548143096400,
                    end_date: 1548144813793,
                    limit_by_user: '1',
                    min_user_level: '2',
                    max_user_level: '3',
                    amount: '100',
                    partner: '1',
                },
            ],
        },
    },
    voucher: {
        'success': true,
        'message': 'reward read successfully.',
        'result': {
            'page': {
                'base': 'https://hermo-test.herokuapp.com:1337/',
                'path': 'postgres/menu',
            },
            'meta': {
                'totalCount': 3,
                'currentPage': 1,
                'perPage': 10,
                'pageCount': 1,
            },
            'result': [
                {
                    id: '1',
                    code: 'mamaklife',
                    event_code: 'mamaklife',
                    user_id: 'kwtam',
                    created_by: 'tplim',
                    created_at: 1548143096400,
                    start_date: 1548143096400,
                    end_date: 1548144813793,
                },
            ],
        },
    },
};

export default dataGroup;
