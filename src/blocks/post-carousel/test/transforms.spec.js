/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import { name, settings } from '../index';
import { name as postsBlockName, settings as postsBlockSettings } from '../../posts/index';

describe( 'coblocks/post-carousel transforms', () => {
	// Shared attributes
	const attributes = {
		align: 'center',
		columns: 3,
		displayPostContent: true,
		displayPostContentRadio: 'excerpt',
		displayPostDate: true,
		excerptLength: 55,
		order: 'desc',
		orderBy: 'date',
		postLayout: 'list',
		postsToShow: 14,
	};

	settings.attributes = metadata.attributes;

	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/latest-posts block', () => {
		const coreLatestPosts = createBlock( 'core/latest-posts', attributes );
		const transformed = switchToBlockType( coreLatestPosts, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.order ).toBe( attributes.order );
		expect( transformed[ 0 ].attributes.orderBy ).toBe( attributes.orderBy );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );

	it( 'should transform from coblocks/posts block', () => {
		registerBlockType( postsBlockName, { category: 'common', ...postsBlockSettings } );

		const coblocksPosts = createBlock( 'coblocks/posts', attributes );
		const transformed = switchToBlockType( coblocksPosts, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.order ).toBe( attributes.order );
		expect( transformed[ 0 ].attributes.orderBy ).toBe( attributes.orderBy );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );

	it( 'should transform to core/latest-posts block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/latest-posts' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/latest-posts' );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );
} );

